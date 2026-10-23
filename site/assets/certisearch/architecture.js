// Bounded, static architecture pages. Only declared components and connections are used.
// Diagram Design: topology first, functional groups, orthogonal ports and crossing bridges.
export const serviceLayer = id => ({ 'api-gateway':'Acceso e integración', aidp:'Procesamiento', lakehouse:'Datos', oac:'Analítica', oke:'Aplicaciones e IA', 'generative-ai':'Aplicaciones e IA' })[id] || 'Servicios OCI';
// Older portable cases used title/text; retain their authored meaning when reopening.
export const architectureNodeLabel = node => node.label || node.title || node.serviceId || node.id;
export const architectureNodePurpose = node => node.purpose || node.text || node.description || '';

/** Accept only the bounded, packaged icon catalog; case/model fields never supply asset URLs. */
export function validateArchitectureComponents(value) {
  if(value?.schemaVersion!==1||!Array.isArray(value.components)||!value.components.length||value.components.length>100)throw new Error('Catálogo de componentes incompatible');
  const seen=new Set();
  for(const item of value.components){
    if(!validComponent(item)||seen.has(item.id))throw new Error('Componente físico o SVG local no permitido');
    seen.add(item.id);
  }
  return value.components;
}

function validComponent(item) {
  if(!item||!['oci-service','external-system'].includes(item.kind))return false;
  if(!['id','name','layer','icon'].every(key=>typeof item[key]==='string'&&item[key].length>0&&item[key].length<=160))return false;
  return /^[a-z][a-z0-9-]{0,63}$/.test(item.id)&&/^assets\/(oci|icons)\/[a-z0-9-]+\.svg$/.test(item.icon);
}

export function wrapArchitectureText(value, width=28) {
  const words=String(value).trim().split(/\s+/).flatMap(word=>Array.from(word).reduce((parts,char,index)=>{if(index%width===0)parts.push('');parts[parts.length-1]+=char;return parts;},[]));
  const lines=[];
  for(const word of words){if(lines.length&&Array.from(lines.at(-1)).length+Array.from(word).length+1<=width)lines[lines.length-1]+=` ${word}`;else lines.push(word);}
  return lines.length?lines:[''];
}

// Collapse cycles before ranking, so a return path never changes the meaning of the graph.
export function architectureOrder(nodes, edges) {
  const byId=new Map(nodes.map(node=>[node.id,node])),adjacent=new Map(nodes.map(node=>[node.id,[]]));
  for(const edge of edges)if(byId.has(edge.source)&&byId.has(edge.target))adjacent.get(edge.source).push(edge.target);
  let sequence=0;const index=new Map(),low=new Map(),stack=[],active=new Set(),groups=[];
  function visit(id){index.set(id,sequence);low.set(id,sequence++);stack.push(id);active.add(id);
    for(const target of adjacent.get(id)){if(!index.has(target)){visit(target);low.set(id,Math.min(low.get(id),low.get(target)));}else if(active.has(target))low.set(id,Math.min(low.get(id),index.get(target)));}
    if(low.get(id)===index.get(id)){const group=[];let member;do{member=stack.pop();active.delete(member);group.push(member);}while(member!==id);groups.push(group);}
  }
  nodes.forEach(node=>{if(!index.has(node.id))visit(node.id);});
  const membership=new Map(groups.flatMap((group,i)=>group.map(id=>[id,i]))),ranks=new Map(groups.map((_,i)=>[i,0]));
  // A condensation graph is a DAG; at most group-count relaxation rounds are needed.
  for(let round=0;round<groups.length;round++){let changed=false;for(const edge of edges){const a=membership.get(edge.source),b=membership.get(edge.target);if(a!==undefined&&b!==undefined&&a!==b&&ranks.get(b)<ranks.get(a)+1){ranks.set(b,ranks.get(a)+1);changed=true;}}if(!changed)break;}
  return nodes.map((node,order)=>({node,order,rank:ranks.get(membership.get(node.id))||0})).sort((a,b)=>a.rank-b.rank||a.order-b.order);
}

const columnCount = entries => [...new Set(entries.map(item=>item.rank))].reduce((count,rank)=>count+Math.ceil(entries.filter(item=>item.rank===rank).length/2),0);

export function architecturePages(nodes,edges) {
  const ordered=architectureOrder(nodes,edges),pages=[];let batch=[];
  const flush=()=>{if(batch.length){pages.push({nodes:batch.map(item=>item.node),edges:[],detail:false});batch=[];}};
  for(const entry of ordered){if(batch.length&&(batch.length===6||columnCount([...batch,entry])>3))flush();batch.push(entry);}flush();
  const remaining=[];
  for(const edge of edges){const page=pages.find(item=>item.nodes.some(node=>node.id===edge.source)&&item.nodes.some(node=>node.id===edge.target)&&item.edges.length<8);if(page)page.edges.push(edge);else remaining.push(edge);}
  // Cross-page relations are shown with their original endpoints, not invented proxy nodes.
  for(const edge of remaining){let page=pages.at(-1);const ids=new Set([...(page?.detail?page.nodes.map(node=>node.id):[]),edge.source,edge.target]);const entries=ordered.filter(item=>ids.has(item.node.id));
    if(!page?.detail||page.edges.length===8||ids.size>6||columnCount(entries)>3){page={nodes:ordered.filter(item=>item.node.id===edge.source||item.node.id===edge.target).map(item=>item.node),edges:[],detail:true};pages.push(page);}else page.nodes=entries.map(item=>item.node);
    page.edges.push(edge);
  }
  return pages;
}

const inside = (point,box,pad=0) => point.x>box.x-pad&&point.x<box.x+box.width+pad&&point.y>box.y-pad&&point.y<box.y+box.height+pad;
export const segments = points => points.slice(1).map((b,index)=>({a:points[index],b}));
export function crossesBox(a,b,box,pad=0) {
  return a.x===b.x ? a.x>box.x-pad&&a.x<box.x+box.width+pad&&Math.max(a.y,b.y)>box.y-pad&&Math.min(a.y,b.y)<box.y+box.height+pad : a.y>box.y-pad&&a.y<box.y+box.height+pad&&Math.max(a.x,b.x)>box.x-pad&&Math.min(a.x,b.x)<box.x+box.width+pad;
}
function crossing(a,b,c,d){
  if((a.x===b.x)===(c.x===d.x))return null;
  const vertical=a.x===b.x?{a,b}:{a:c,b:d},horizontal=a.y===b.y?{a,b}:{a:c,b:d},point={x:vertical.a.x,y:horizontal.a.y};
  return point.x>Math.min(horizontal.a.x,horizontal.b.x)&&point.x<Math.max(horizontal.a.x,horizontal.b.x)&&point.y>Math.min(vertical.a.y,vertical.b.y)&&point.y<Math.max(vertical.a.y,vertical.b.y)?point:null;
}
function overlaps(a,b,c,d){
  if(a.x===b.x&&c.x===d.x)return Math.abs(a.x-c.x)<12&&Math.min(Math.max(a.y,b.y),Math.max(c.y,d.y))>Math.max(Math.min(a.y,b.y),Math.min(c.y,d.y));
  if(a.y===b.y&&c.y===d.y)return Math.abs(a.y-c.y)<12&&Math.min(Math.max(a.x,b.x),Math.max(c.x,d.x))>Math.max(Math.min(a.x,b.x),Math.min(c.x,d.x));
  return false;
}
const simplify = points => points.filter((point,index)=>!index||index===points.length-1||!((points[index-1].x===point.x&&point.x===points[index+1].x)||(points[index-1].y===point.y&&point.y===points[index+1].y)));

// Search a small orthogonal visibility grid, not a free-form diagram editor.
function route(start,end,boxes,previous,canvasHeight=720,canvasWidth=1280) {
  const xs=[...new Set([24,canvasWidth-24,start.x,end.x,...boxes.flatMap(box=>[box.x-24,box.x+box.width+24]),...Array.from({length:Math.floor((canvasWidth-56)/24)+1},(_,i)=>32+i*24)])].sort((a,b)=>a-b);
  const ys=[...new Set([24,canvasHeight-24,start.y,end.y,...boxes.flatMap(box=>[box.y-24,box.y+box.height+24]),...Array.from({length:Math.ceil(canvasHeight/24)},(_,i)=>32+i*24)])].sort((a,b)=>a-b);
  const sx=xs.indexOf(start.x),sy=ys.indexOf(start.y),tx=xs.indexOf(end.x),ty=ys.indexOf(end.y),key=(x,y,d)=>`${x},${y},${d}`;
  const open=[{x:sx,y:sy,d:0,g:0,f:0}],distance=new Map([[key(sx,sy,0),0]]),parent=new Map();let finish;
  while(open.length){let smallest=0;for(let i=1;i<open.length;i++)if(open[i].f<open[smallest].f)smallest=i;const current=open.splice(smallest,1)[0],currentKey=key(current.x,current.y,current.d);
    if(current.g!==distance.get(currentKey))continue;if(current.x===tx&&current.y===ty){finish=currentKey;break;}
    const a={x:xs[current.x],y:ys[current.y]};
    for(const [dx,dy,d] of [[1,0,1],[-1,0,1],[0,1,2],[0,-1,2]]){const x=current.x+dx,y=current.y+dy;if(x<0||x>=xs.length||y<0||y>=ys.length)continue;const b={x:xs[x],y:ys[y]};
      if(boxes.some(box=>inside(b,box,10)||crossesBox(a,b,box,10))||previous.some(segment=>overlaps(a,b,segment.a,segment.b)))continue;
      const cost=Math.abs(a.x-b.x)+Math.abs(a.y-b.y)+(current.d&&current.d!==d?28:0)+previous.filter(segment=>crossing(a,b,segment.a,segment.b)).length*40;
      const nextKey=key(x,y,d),g=current.g+cost;if(g>=(distance.get(nextKey)??Infinity))continue;
      distance.set(nextKey,g);parent.set(nextKey,currentKey);open.push({x,y,d,g,f:g+Math.abs(b.x-end.x)+Math.abs(b.y-end.y)});
    }
  }
  if(!finish)return null;
  const points=[];for(let at=finish;at;at=parent.get(at)){const [x,y]=at.split(',').map(Number);points.unshift({x:xs[x],y:ys[y]});}return simplify(points);
}

function sides(a,b){if(a===b)return ['right','bottom'];const dx=b.x+b.width/2-a.x-a.width/2,dy=b.y+b.height/2-a.y-a.height/2;return Math.abs(dx)>=Math.abs(dy)?(dx>0?['right','left']:['left','right']):(dy>0?['bottom','top']:['top','bottom']);}
function port(box,side,index,total){const offset=32+(side==='left'||side==='right'?box.height-64:box.width-64)*(index+1)/(total+1);return side==='left'?{x:box.x,y:box.y+offset}:side==='right'?{x:box.x+box.width,y:box.y+offset}:side==='top'?{x:box.x+offset,y:box.y}:{x:box.x+offset,y:box.y+box.height};}
const stub=(point,side)=>({x:point.x+(side==='left'?-24:side==='right'?24:0),y:point.y+(side==='top'?-24:side==='bottom'?24:0)});

export function layoutArchitecture(nodes,edges) {
  const order=architectureOrder(nodes,edges),columns=[];
  for(const rank of new Set(order.map(item=>item.rank))){const entries=order.filter(item=>item.rank===rank);for(let i=0;i<entries.length;i+=2)columns.push(entries.slice(i,i+2));}
  const gap=112,width=Math.min(352,(1184-gap*(columns.length-1))/Math.max(1,columns.length)),left=(1280-(width*columns.length+gap*(columns.length-1)))/2;
  const boxes=columns.flatMap((column,index)=>{
    const items=column.map(({node,rank})=>{const full=architectureNodeLabel(node),caption=full.length>180?(node.serviceId||node.id):full,lines=wrapArchitectureText(caption,Math.floor((width-36)/13.5));return {node,rank,caption,lines,height:Math.max(200,lines.length*30+112)};});
    const total=items.reduce((sum,item)=>sum+item.height,0)+(items.length-1)*108;let y=76+(608-total)/2;
    return items.map(item=>{const box={...item,x:left+index*(width+gap),y,width};y+=item.height+108;return box;});
  });
  if(boxes.some(box=>box.y<52||box.y+box.height>688))return {boxes,edges:[],overflow:true};
  return routeArchitecture(boxes,edges);
}

function routeArchitecture(boxes,edges,canvasHeight=720,canvasWidth=1280) {
  const byId=new Map(boxes.map(box=>[box.node.id,box])),ports=new Map(),requests=[];
  for(const edge of edges){const a=byId.get(edge.source),b=byId.get(edge.target);if(!a||!b)continue;const [sourceSide,targetSide]=sides(a,b),request={edge,a,b,sourceSide,targetSide};requests.push(request);
    for(const [box,side,kind] of [[a,sourceSide,'source'],[b,targetSide,'target']]){const key=`${box.node.id}:${side}`;if(!ports.has(key))ports.set(key,[]);ports.get(key).push({request,kind});}
  }
  for(const entries of ports.values())entries.forEach(({request,kind},i)=>{request[kind]=port(kind==='source'?request.a:request.b,request[`${kind}Side`],i,entries.length);});
  const routed=[],occupied=[];
  for(const request of requests){const start=stub(request.source,request.sourceSide),end=stub(request.target,request.targetSide),middle=route(start,end,boxes,occupied,canvasHeight,canvasWidth);if(!middle)return {boxes,edges:routed,overflow:true};
    const points=simplify([request.source,...middle,request.target]);const hops=segments(points).flatMap((segment,index)=>occupied.flatMap(other=>{const point=crossing(segment.a,segment.b,other.a,other.b);return point?[{...point,segment:index}]:[];}));
    if(hops.some((hop,index)=>[points[hop.segment],points[hop.segment+1]].some(point=>Math.abs(point.x-hop.x)+Math.abs(point.y-hop.y)<20)||hops.some((other,j)=>j!==index&&other.segment===hop.segment&&Math.abs(other.x-hop.x)+Math.abs(other.y-hop.y)<20)))return {boxes,edges:routed,overflow:true};
    routed.push({edge:request.edge,points,hops});occupied.push(...segments(points));
  }
  return {boxes,edges:routed,overflow:false};
}

// The presentation is a single high-level view; the report keeps the detailed layouts.
// Functional lanes come from connected components, never from invented network scopes.
export function architectureOverview(nodes,edges) {
  const physical=nodes.length&&nodes.every(node=>node.componentId)?physicalOverview(nodes,edges):null;
  return physical||legacyOverview(nodes,edges);
}

function legacyOverview(nodes,edges) {
  const ordered=architectureOrder(nodes,edges).map(item=>item.node),byId=new Map(nodes.map(node=>[node.id,node]));
  const adjacent=new Map(nodes.map(node=>[node.id,new Set()]));
  for(const edge of edges){adjacent.get(edge.source)?.add(edge.target);adjacent.get(edge.target)?.add(edge.source);}
  const seen=new Set(),groups=[];
  for(const node of ordered){if(seen.has(node.id))continue;const members=new Set(),queue=[node.id];
    while(queue.length){const id=queue.shift();if(seen.has(id)||!byId.has(id))continue;seen.add(id);members.add(id);queue.push(...adjacent.get(id));}
    groups.push(ordered.filter(item=>members.has(item.id)));
  }
  groups.sort((a,b)=>Number(b.some(node=>['aidp','lakehouse','oac'].includes(node.serviceId)))-Number(a.some(node=>['aidp','lakehouse','oac'].includes(node.serviceId))));
  const columns=Math.min(5,Math.max(1,...groups.map(group=>group.length))),rowCount=groups.reduce((sum,group)=>sum+Math.ceil(group.length/columns),0);
  const canvasWidth=Math.max(1280,columns*376+48),contentWidth=canvasWidth-48;
  const groupGap=Math.min(56,160/Math.max(1,groups.length-1)),columnWidth=contentWidth/columns,rowHeight=334,width=Math.min(280,columnWidth-96),boxes=[],zones=[];let row=0;
  const canvasHeight=240+rowCount*rowHeight+groupGap*Math.max(0,groups.length-1);
  for(const [groupIndex,group] of groups.entries()){const rows=Math.ceil(group.length/columns),top=144+row*rowHeight+groupIndex*groupGap,height=rows*rowHeight;
    zones.push({x:24,y:top,width:contentWidth,height,label:group.some(node=>['aidp','lakehouse','oac'].includes(node.serviceId))?'Flujo de datos':'Aplicaciones e IA'});
    group.forEach((node,index)=>{const x=24+(index%columns)*columnWidth+(columnWidth-width)/2;
      const boxHeight=Math.min(200,rowHeight*.6),iconSize=Math.min(68,boxHeight/3);
      const label=architectureNodeLabel(node),caption=label.length>120||boxHeight<120?(node.serviceId||node.id):label;
      let fontSize=Math.min(20,Math.max(12,boxHeight/6.5)),lines;
      do{lines=wrapArchitectureText(caption,Math.floor((width-32)/(fontSize*.55)));if(iconSize+32+fontSize+(lines.length-1)*fontSize*1.15<=boxHeight||fontSize<=12)break;fontSize-=2;}while(true);
      boxes.push({node,x,y:top+Math.floor(index/columns)*rowHeight+70+(rowHeight-70-boxHeight)/2,width,height:boxHeight,caption,lines,fontSize,iconSize});
    });row+=rows;
  }
  const layout=routeArchitecture(boxes,edges,canvasHeight,canvasWidth);
  return {...layout,nodes,overview:true,zones,columns,width:canvasWidth,height:canvasHeight};
}

/** Rank the primary declared traffic; responses/administration retain their own return routes. */
function physicalOverview(nodes,edges) {
  const data=edges.filter(edge=>edge.kind==='data-flow');
  const primary=data.length?data:edges.filter(edge=>edge.kind==='request');
  const ordered=architectureOrder(nodes,primary),ranks=[...new Set(ordered.map(item=>item.rank))];
  const columns=Math.max(1,ranks.length),canvasWidth=Math.max(1280,columns*232+48),contentWidth=canvasWidth-48,columnWidth=contentWidth/columns,width=168;
  const rows=Math.max(...ranks.map(rank=>ordered.filter(item=>item.rank===rank).length));
  // Cycles share a lane. Leave room between stacked cards for both directed stubs.
  const contentHeight=Math.max(320,rows*232),canvasHeight=contentHeight+232;
  const rowHeight=contentHeight/rows,height=Math.min(160,rowHeight-72),boxes=[];
  for(const [index,rank] of ranks.entries()){
    const entries=ordered.filter(item=>item.rank===rank),top=156+(contentHeight-entries.length*rowHeight)/2;
    entries.forEach(({node},row)=>{
      const caption=architectureNodeLabel(node),fontSize=16,iconSize=Math.min(52,height*.44);
      boxes.push({node,rank,x:24+index*columnWidth+(columnWidth-width)/2,y:top+row*rowHeight+(rowHeight-height)/2,
        width,height,caption,lines:wrapArchitectureText(caption,Math.max(10,Math.floor((width-24)/(fontSize*.55)))),fontSize,iconSize});
    });
  }
  const layout=routeArchitecture(boxes,edges,canvasHeight,canvasWidth);
  if(layout.overflow)return null;
  return {...layout,nodes,overview:true,physical:true,zones:[{x:24,y:124,width:contentWidth,height:canvasHeight-164,label:'Arquitectura de la solución'}],columns,width:canvasWidth,height:canvasHeight};
}

// If a dense page cannot preserve routing clearance, split its actual relationships.
export function architectureLayouts(nodes,edges) {
  return architecturePages(nodes,edges).flatMap(page=>{
    const layout=layoutArchitecture(page.nodes,page.edges);if(!layout.overflow)return [{...page,...layout}];
    const singles=page.nodes.map(node=>({...layoutArchitecture([node],[]),nodes:[node],edges:[],detail:page.detail}));
    return [...singles,...page.edges.map(edge=>{const endpoints=page.nodes.filter(node=>node.id===edge.source||node.id===edge.target);return {...page,...layoutArchitecture(endpoints,[edge]),nodes:endpoints,detail:true};})];
  });
}

export function connectorPath(points,hops=[]) {
  let path=`M${points[0].x},${points[0].y}`;
  for(let i=1;i<points.length;i++){const previous=points[i-1],point=points[i],next=points[i+1],dx=Math.sign(point.x-previous.x),dy=Math.sign(point.y-previous.y),length=Math.abs(point.x-previous.x)+Math.abs(point.y-previous.y),r=next?Math.min(8,length/2,(Math.abs(next.x-point.x)+Math.abs(next.y-point.y))/2):0;
    const bridges=hops.filter(hop=>hop.segment===i-1).filter(hop=>Math.abs(hop.x-previous.x)+Math.abs(hop.y-previous.y)>18&&Math.abs(hop.x-point.x)+Math.abs(hop.y-point.y)>18).sort((a,b)=>(a.x-b.x)*dx+(a.y-b.y)*dy);
    for(const hop of bridges){path+=` L${hop.x-dx*7},${hop.y-dy*7} a7,7 0 0,${dx>0||dy<0?1:0} ${dx*14},${dy*14}`;}
    path+=` L${point.x-dx*r},${point.y-dy*r}`;
    if(next){path+=` Q${point.x},${point.y} ${point.x+Math.sign(next.x-point.x)*r},${point.y+Math.sign(next.y-point.y)*r}`;}
  }
  return path;
}

export function connectionLabel(connection,boxes,occupied=[],routes=[],canvasHeight=720) {
  const candidates=segments(connection.points).sort((a,b)=>(Math.abs(b.a.x-b.b.x)+Math.abs(b.a.y-b.b.y))-(Math.abs(a.a.x-a.b.x)+Math.abs(a.a.y-a.b.y)));
  for(const {a,b} of candidates){const x=(a.x+b.x)/2,y=(a.y+b.y)/2;for(const offset of [-1,1]){const label=a.y===b.y?{x:x-18,y:y+(offset<0?-42:10),width:36,height:32}:{x:x+(offset<0?-46:10),y:y-16,width:36,height:32};
    if(label.x<8||label.x+label.width>1272||label.y<8||label.y+label.height>canvasHeight-8)continue;
    if([...boxes,...occupied].some(box=>label.x<box.x+box.width+8&&label.x+label.width>box.x-8&&label.y<box.y+box.height+8&&label.y+label.height>box.y-8)||routes.some(segment=>crossesBox(segment.a,segment.b,label,4)))continue;
    return label;
  }}
  return null;
}

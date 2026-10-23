/** Capture only the active case report as text and local vectors for PDF export. */
const properties=['fill','fill-opacity','fill-rule','stroke','stroke-width','stroke-opacity','stroke-linecap','stroke-linejoin','stroke-dasharray','opacity','font-size','font-weight','text-anchor','dominant-baseline'];

function arrowGeometry(source,target,style){
  if(source.tagName.toLowerCase()!=='path'||!source.hasAttribute('marker-end'))return;
  const length=source.getTotalLength(),end=source.getPointAtLength(length),prior=source.getPointAtLength(Math.max(0,length-2));
  const angle=Math.atan2(end.y-prior.y,end.x-prior.x),size=6*parseFloat(style.strokeWidth||'1');
  const arrow=document.createElementNS('http://www.w3.org/2000/svg','polygon');
  const point=(along,across)=>`${end.x-along*Math.cos(angle)+across*Math.sin(angle)},${end.y-along*Math.sin(angle)-across*Math.cos(angle)}`;
  arrow.setAttribute('points',`${point(0,0)} ${point(size,size/2)} ${point(size,-size/2)}`);arrow.setAttribute('fill',style.stroke);target.after(arrow);target.removeAttribute('marker-end');
}

async function embedIcon(image){
  const url=new URL(image.getAttribute('href'),location.href);
  if(url.origin!==location.origin||!/^\/certitips\/assets\/(?:oci\/[a-z0-9-]+|icons\/(?:document|database|workflow)(?:-thin)?)\.svg$/.test(url.pathname))throw new Error('SVG icon outside verified local catalog');
  const response=await fetch(url);if(!response.ok)throw new Error('Missing OCI vector');
  const artwork=new DOMParser().parseFromString(await response.text(),'image/svg+xml').documentElement;
  if(artwork.localName!=='svg'||artwork.querySelector('script,foreignObject,image'))throw new Error('Unexpected icon content');
  for(const element of [artwork,...artwork.querySelectorAll('*')])for(const name of ['stroke','fill'])if(element.getAttribute(name)==='currentColor')element.setAttribute(name,'#59616e');
  for(const name of ['x','y','width','height','preserveAspectRatio'])if(image.hasAttribute(name))artwork.setAttribute(name,image.getAttribute(name));
  image.replaceWith(document.importNode(artwork,true));
}

function vectorStyle(source,target){
  const style=getComputedStyle(source);
  for(const property of properties)target.style.setProperty(property,style.getPropertyValue(property));
  target.style.fontFamily='DejaVu Sans, sans-serif';
  for(const attribute of [...target.attributes])if(attribute.name.startsWith('on')||['tabindex','data-select','role'].includes(attribute.name))target.removeAttribute(attribute.name);
  arrowGeometry(source,target,style);
}

async function portableSVG(original){
  const clone=original.cloneNode(true),originals=[original,...original.querySelectorAll('*')],copies=[clone,...clone.querySelectorAll('*')];
  originals.forEach((source,index)=>vectorStyle(source,copies[index]));
  // Arrowheads are now explicit polygons; unused browser markers are not PDF geometry.
  clone.querySelectorAll('marker').forEach(marker=>marker.remove());
  for(const image of [...clone.querySelectorAll('image')])await embedIcon(image);
  clone.setAttribute('xmlns','http://www.w3.org/2000/svg');
  const box=original.viewBox.baseVal;clone.setAttribute('width',box.width);clone.setAttribute('height',box.height);clone.removeAttribute('style');
  return new XMLSerializer().serializeToString(clone);
}

function blockText(element){
  const text=element.innerText;
  const urls=[...new Set([...element.querySelectorAll('a[href]')].map(link=>link.href))].filter(url=>/^https?:/.test(url)&&!text.includes(url));
  return [text,...urls].join('\n');
}

async function sectionContents(section){
  const blocks=[...section.querySelectorAll('h3,h4,p,li,dt,dd')].filter(element=>element!==section.firstElementChild&&!element.closest('table')&&(!element.closest('li')||element.closest('li')===element));
  return {id:section.dataset.reportSection,title:section.firstElementChild.textContent,
    blocks:blocks.map(element=>({tag:element.tagName.toLowerCase(),text:blockText(element)})),
    tables:[...section.querySelectorAll('table')].map(table=>[...table.rows].map(row=>[...row.cells].map(blockText))),
    vectors:await Promise.all([...section.querySelectorAll('svg')].map(portableSVG))};
}

export async function captureReport(root=document.querySelector('[data-search-print] .search-report')){
  if(!root)throw new Error('Native print report missing');
  const sections=await Promise.all([...root.querySelectorAll(':scope > [data-report-section]')].map(sectionContents));
  return {sections,renderedCaseId:root.dataset.caseId,renderedRevision:Number(root.dataset.caseRevision),renderedConversation:[...root.querySelectorAll('.report-turn p')].map(element=>element.textContent),coverDataUrl:root.querySelector('.report-cover .case-image')?.src||null};
}

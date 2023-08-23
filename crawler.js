const {JSDOM}=require('jsdom')

async function crawlpage(baseurl,currenturl,pages){

  const baseurlobj=new URL(baseurl)
  const currenturlobj=new URL(currenturl)
  if(baseurlobj.hostname!==currenturlobj.hostname){
    return pages
  }
  const normalizedcurrenturl=normalizeURL(currenturl)
  if(pages[normalizedcurrenturl]>0){
    pages[normalizedcurrenturl]++
    return pages
  }
  pages[normalizedcurrenturl]=1
  console.log(`currently crawling ${currenturl}`)
  try{
    const res=await fetch(currenturl)
    if(res.status>399){
      console.log(`error while fetching from ${currenturl} with status code ${res.status}`)
      return pages
    }
    const content_type=res.headers.get('content-type')
    if(!content_type.includes('text/html')){
      console.log(`content type of ${currenturl} is ${content_type} which is not valid`)
      return pages
    }
    const htmlbody=await res.text()
    const nexturls=geturlsfromHTML(htmlbody,baseurl)
    for (const nextURL of nexturls){
      pages = await crawlpage(baseurl, nextURL, pages)
    }
  }
  catch(err){
    console.log(`error while fetching the url ${currenturl}`)
  }
  return pages
}

function geturlsfromHTML(htmlbody,baseurl){
   const urls=[]
   const dom=new JSDOM(htmlbody)
   const linkelements=dom.window.document.querySelectorAll('a')
   linkelements.forEach((linkelement)=>{
    if(linkelement.href.length>0 && linkelement.href.slice(0,1)==='/'){
      try{
        const url=`${baseurl}${linkelement.href}`
        const urlobj=new URL(url)
        urls.push(urlobj.href)
      }
      catch(err){
        console.log(err.message)
      }
    }
    else{
      try{
        const url=linkelement.href
        const urlobj=new URL(url)
        urls.push(urlobj.href)
      }
      catch(err){
        console.log(err.message)
      }
    }
   })
   return urls
}

function normalizeURL(url) {
  try{
    const urlobj=new URL(url) 
    const hostname=`${urlobj.hostname}${urlobj.pathname}`
    if(hostname.length>0 && hostname.slice(-1)==='/'){
      return hostname.slice(0,-1)
    }
    return hostname
  }
  catch(err){
    console.log(err.message)
    return ''
  }
}

module.exports = {
    normalizeURL,
    geturlsfromHTML,
    crawlpage
}
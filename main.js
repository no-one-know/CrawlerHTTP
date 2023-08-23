const {crawlpage}=require('./crawler.js')
const {sortpages,printreport}=require('./report.js')

async function main(){
    if(process.argv.length<3){
        console.log("No website craweled")
        process.exit(1)
    }
    if(process.argv.length>3){
        console.log("Too many command line arguments")
        process.exit(1)
    }
    const baseurl=process.argv[2]
    console.log(`you are corweling ${baseurl}`)
    const pages=await crawlpage(baseurl,baseurl,{})
    const sortedpages=sortpages(pages)
    printreport(sortedpages)
}

main()
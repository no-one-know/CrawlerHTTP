function printreport(sortedpages){
    console.log("=======================================================")
    console.log("=======================================================")
    console.log("========================Report=========================")
    for(const sortedpage of sortedpages){
        console.log(`Found ${sortedpage[1]} links to ${sortedpage[0]}`)
    }
    console.log("======================End Report=======================")
}

function sortpages(pages){
    const sortedpages=Object.entries(pages)
    sortedpages.sort((a,b)=>{
        return b[1]-a[1]
    })
    return sortedpages
}

module.exports={
    printreport,
    sortpages
}

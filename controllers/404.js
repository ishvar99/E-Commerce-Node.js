exports.pageNotFound=(req,res,next)=>{
    // res.status(404).sendFile(path.join(rootDir,"..","views","404.html")) //__dirname gives current directory
    res.status(404).render("404",{pageTitle:"page not found",path:'/404'})
}
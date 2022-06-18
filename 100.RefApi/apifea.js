class APIFeatures {
  constructor(query, queryStrC) {
    this.query = query; // tours
    this.queryStrC = queryStrC; // req.query
  }
  filter() {
    // Applying filtering
    const queryObj = { ...this.queryStrC };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);
    // 1)  applying regular expression for Greater than , equal ,Less Than
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // Parsing
    return this.query.find(JSON.parse(queryStr));
  }
  sort() {
    // 2) Sorting
   if (this.queryStrC.sort) {
         const SortBy = this.queryStrC.sort.split(',').join(' ');
      return this.query.find().sort(SortBy);
    }
   return this;
  }
  /* Paginate using method Not Working
     paginate(){
      if((this.queryStrC.page)|| (this.queryStrC.limit)){
        console.log('log4')
        const page = this.queryStrC.page * 1 || 1;
        const limit = this.queryStrC.limit * 1 || 100 ;
        const skip =   (page-1)*limit;
        const tourCount = this.query.countDocuments();
        if(skip>=tourCount)    throw new Error('This Page Dosent Exists');
        return this.query.find().skip(skip).limit(limit); 
       }
      }
    */
}
module.exports = APIFeatures;

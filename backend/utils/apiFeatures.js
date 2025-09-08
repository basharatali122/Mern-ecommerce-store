class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ?
            {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: "i",
                },
            }
            : {};

        console.log(keyword)
        this.query = this.query.find({ ...keyword });
        return this;
    }


    filter() {
        const queryCopy = { ...this.queryStr };

        const remmoveFields = ["keyword", "page", "limit"];

        remmoveFields.forEach((key) => delete queryCopy[key]);



        console.log(queryCopy)
        //Price filter method
        // Make a copy of query object
        let queryStr = JSON.stringify(queryCopy);

        // Replace operators like gt, gte, lt, lte with $gt, $gte, $lt, $lte
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        // Convert back to JSON object and apply to Mongoose find
        this.query = this.query.find(JSON.parse(queryStr));

        console.log(queryStr)
        return this;


    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip)
        return this;
    }
}

module.exports = ApiFeatures;
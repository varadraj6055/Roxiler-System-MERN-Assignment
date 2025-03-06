const axios = require("axios");
const Product = require("./../model/productModel");
const ApiFeatures = require("./../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.fetchAndSeedData = catchAsync(async (req, res, next) => {
  const response = await axios.get(
    "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
  );
  const products = response.data;

  for (const product of products) {
    await Product.create(product);
  }

  res.status(201).json({
    status: "success",
    message: "data inserted successfully!",
  });
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = new ApiFeatures(Product.find(), req.query)
    .filterByMonth()
    .search();

  const results = await products.query;

  const totalResults = results.length;

  const paginatedProducts = new ApiFeatures(Product.find(), req.query)
    .filterByMonth()
    .pagination()
    .search();

  const paginatedResults = await paginatedProducts.query;

  res.status(200).json({
    status: "success",
    totalResults,
    resultsPerPage: paginatedResults.length,
    data: {
      results: paginatedResults,
    },
  });
});

exports.productsStats = catchAsync(async (req, res, next) => {
  const month = req.params.month * 1;

  const stats = await Product.aggregate([
    {
      $match: {
        $expr: {
          $eq: [{ $month: "$dateOfSale" }, month],
        },
      },
    },
    {
      $group: {
        _id: { month: { $month: "$dateOfSale" } },
        totalSaleAmount: {
          $sum: {
            $cond: [{ $eq: ["$sold", true] }, "$price", 0],
          },
        },
        totalSoldItems: {
          $sum: {
            $cond: [{ $eq: ["$sold", true] }, 1, 0],
          },
        },
        totalNotSoldItems: {
          $sum: {
            $cond: [{ $eq: ["$sold", false] }, 1, 0],
          },
        },
      },
    },
    {
      $addFields: { month: "$_id.month" },
    },
    {
      $project: { _id: 0 },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: stats[0] || {},
  });
});

exports.productBarChart = catchAsync(async (req, res, next) => {
  const month = req.params.month * 1;

  const stats = await Product.aggregate([
    {
      $match: {
        $expr: { $eq: [{ $month: "$dateOfSale" }, month] },
      },
    },
    {
      $group: {
        _id: {
          $switch: {
            branches: [
              { case: { $lte: ["$price", 100] }, then: "0 - 100" },
              { case: { $lte: ["$price", 200] }, then: "101 - 200" },
              { case: { $lte: ["$price", 300] }, then: "201 - 300" },
              { case: { $lte: ["$price", 400] }, then: "301 - 400" },
              { case: { $lte: ["$price", 500] }, then: "401 - 500" },
              { case: { $lte: ["$price", 600] }, then: "501 - 600" },
              { case: { $lte: ["$price", 700] }, then: "601 - 700" },
              { case: { $lte: ["$price", 800] }, then: "701 - 800" },
              { case: { $lte: ["$price", 900] }, then: "801 - 900" },
              { case: { $gte: ["$price", 901] }, then: "901 - above" },
            ],
            default: "901 - above",
          },
        },
        count: { $sum: 1 },
      },
    },
  ]);

  const priceRanges = [
    "0 - 100",
    "101 - 200",
    "201 - 300",
    "301 - 400",
    "401 - 500",
    "501 - 600",
    "601 - 700",
    "701 - 800",
    "801 - 900",
    "901 - above",
  ];

  const counts = priceRanges.map((range) => {
    const stat = stats.find((stat) => stat._id === range);
    return stat ? stat.count : 0;
  });

  res.status(200).json({
    status: "success",
    data: counts,
  });
});

exports.productCategeory = catchAsync(async (req, res, next) => {
  const month = req.params.month * 1;

  const category = await Product.aggregate([
    {
      $match: {
        $expr: {
          $eq: [{ $month: "$dateOfSale" }, month],
        },
      },
    },
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      category,
    },
  });
});

exports.combinedResponse = catchAsync(async (req, res, next) => {
  const month = req.params.month * 1;
  const statsPromise = axios.get(
    `${API_URL}products/stats/${month}`
  );
  const categoryPromise = axios.get(
    `${API_URL}products/category/${month}`
  );
  const barChartPromise = axios.get(
    `${API_URL}products/barChart/${month}`
  );

  const [statsResponse, categoryResponse, barChartResponse] = await Promise.all(
    [statsPromise, categoryPromise, barChartPromise]
  );

  const combinedResponse = {
    stats: statsResponse.data,
    categories: categoryResponse.data,
    barChart: barChartResponse.data,
  };

  res.status(200).json({
    status: "success",
    data: combinedResponse,
  });
});

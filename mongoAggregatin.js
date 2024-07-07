//Sample user:
const user = {
  index: NumberInt(0),
  name: "Aurelia Gonzales",
  isActive: false,
  registered: ISODate("2015-02-11T04:22:39+0000"),
  age: NumberInt(20),
  gender: "female",
  eyeColor: "green",
  favoriteFruit: "banana",
  company: {
    title: "YURTURE",
    email: "aureliagonzales@yurture.com",
    phone: "+1 (940) 501-3963",
    location: {
      country: "USA",
      address: "694 Hewes Street",
    },
  },
  tags: ["enim", "id", "velit", "ad", "consequat"],
};

// Find average Age of users:
db.users.aggregate([
  {
    $group: {
      _id: null, // By what we are grouping. null means all.
      averageAge: {
        $avg: "$age", //generates average of the age field.
      },
    },
  },
]);

// Sort based on which fruits are more favorite:
db.users.aggregate([
  {
    $group: {
      _id: "$favoriteFruit",
      count: {
        $sum: 1, // Adds 1 for each document that matches the group.
      },
    },
  },
  {
    $sort: {
      count: -1, // -1 for descending order and 1 for ascending
    },
  },
  {
    $limit: 2, // To only find the top 2 groups.
  },
]);

// Find the number of males and females:
db.users.aggregate([
  {
    $group: {
      _id: "$gender",
      count: {
        $sum: 1,
      },
    },
  },
]);

// Which country has the highest number of user count:
db.users.aggregate([
  {
    $group: {
      _id: "$company.location.country",
      count: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      count: -1,
    },
  },
  {
    $limit: 1,
  },
]);

// Find the average number of tags per user:
db.users.aggregate([
  {
    $unwind: "$tags",
  },
  {
    $group: {
      _id: "$_id",
      numberOfTags: {
        $sum: 1,
      },
    },
  },
  {
    $group: {
      _id: null,
      averageTags: {
        $avg: "$numberOfTags",
      },
    },
  },
]);
//or
db.users.aggregate([
  {
    $addFields: {
      numberOfTags: {
        $size: {
          $ifNull: ["$tags", []],
        },
      },
    },
  },
  {
    $group: {
      _id: null,
      averageNoOfTags: {
        $avg: "$numberOfTags",
      },
    },
  },
]);

// Find the number of users using the 'enim' tag:
db.users.aggregate([
  {
    $match: {
      tags: "enim",
    },
  },
  {
    $count: "totalUsersUsingThisTag",
  },
]);

// What are the names and ages of the users who are inactive and have 'velit' as a tag:
db.users.aggregate([
  {
    $match: {
      isActive: false,
      tags: "velit",
    },
  },
  {
    $project: {
      name: 1,
      age: 1,
    },
  },
]);

// How many users have a phone number starting with '+1 (940)':
db.users.aggregate([
  {
    $match: {
      "company.phone": /^\+1 \(940\)/,
    },
  },
  {
    $count: "totalUsersWithPhone",
  },
]);

// Find out which user registered most recently:
db.users.aggregate([
  {
    $sort: {
      registered: -1,
    },
  },
  {
    $limit: 1,
  },
]);

// Categorise users based on their favorite fruit:
db.users.aggregate([
  {
    $group: {
      _id: "$favoriteFruit",
      users: {
        $push: "$name",
      },
      userId: {
        $push: "$_id",
      },
    },
  },
]);

// How many users have 'ad' as the second tag in their list of tags:
db.users.aggregate([
  {
    $match: {
      "tags.1": "ad",
    },
  },
  {
    $count: "count",
  },
]);

// Find users who have both 'enim' and 'id' as a tag:
db.users.aggregate([
  {
    $match: {
      tags: {
        $all: ["enim", "id"],
      },
    },
  },
]);

// List all companies located in US with their corresponding user count:
db.users.aggregate([
  {
    $match: {
      "company.location.country": "USA",
    },
  },
  {
    $group: {
      _id: "$company.title",
      count: {
        $sum: 1,
      },
    },
  },
]);

// Join authors to books to get author details:
db.books.aggregate([
  {
    $lookup: {
      from: "authors",
      localField: "author_id",
      foreignField: "myId",
      as: "authorDetails",
    },
  },
  {
    $addFields: {
      authorDetails: {
        $arrayElemAt: ["$authorDetails", 0],
      },
    },
  },
]);

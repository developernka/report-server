const { json } = require('server/reply')
const { ObjectId } = require("mongodb");
// var { MongoClient, ObjectId } = require("mongodb");
// const config = require('./config')
// var db;

// MongoClient.connect(config.mongodb_url, { useNewUrlParser: true }, function (err, mongoClient) {
//     if (err) throw err;
//     db = mongoClient.db(config.database_name);
//     console.log("Connected to Database");
// });

exports.list = async ctx => {
    return json(
        await ctx.db
            .collection(ctx.params.collection)
            .find(ctx.query)
            //   .project({ _id: 1 })
            //   .skip(0)
            //   .limit(10)
            .toArray()
    );
};

exports.read = async ctx => {
    const collections = await ctx.db.collections();
    if (!collections.map(c => c.s.name).includes(ctx.params.collection)) {
        //await db.createCollection(collName);
        var err = new Error("Collection Not Found");
        err.code = err.message;//.toUpperCase().replace(/[ ]/g, "_");
        throw err;
    }
    return json(
        await ctx.db
            .collection(ctx.params.collection)
            .findOne({ _id: ObjectId(ctx.params.id) })
            .then((err, data) => {
                if (err) return err;
                delete data._id;
                return data;
            })
    );
};

exports.create = async ctx => {
    var dt = new Date().toISOString();
    ctx.data.createdAt = dt;
    ctx.data.updatedAt = dt;
    return json(
        await ctx.db
            .collection(ctx.params.collection)
            .insertOne(ctx.data)
            .then(() => {
                delete ctx.data._id;
                return ctx.data;
            })
    );
};

exports.update = async ctx => {
    var update = {
        $set: {},
        $currentDate: {
            updatedAt: true
        }
    };
    for (var k in ctx.data) {
        update.$set[k] = ctx.data[k];
    }
    return await ctx.db
        .collection(ctx.params.collection)
        .findOneAndUpdate({ _id: ObjectId(ctx.params.id) }, update);
};

exports.trash = async ctx => {
    return await ctx.db.collection(ctx.params.collection).findOneAndUpdate(
        { _id: ObjectId(ctx.params.id) },
        {
            $set: {
                trashedBy: ctx.ip
            },
            $currentDate: {
                updatedAt: true,
                trashedAt: true
            }
        }
    );
};

// exports.drop = async ctx => {
//     return await db
//         .collection(ctx.params.collection)
//         .drop()
//         .then(droped => {
//             return { collection: ctx.params.collection, droped: droped };
//         });
// };

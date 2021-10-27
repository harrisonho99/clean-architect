const { MongoClient } = require('mongodb');
const URI = 'mongodb+srv://root:142536@cluster0.7q8km.mongodb.net/myDB?retryWrites=true&w=majority';
const SAMPLE_AIRBNB = 'sample_airbnb';
const LISTING_REVIEWS = 'listingAndReviews';

/**
 * Application Index
 * @returns {Promise<void>}
 */
async function app() {
  const mongodbClient = new MongoClient(URI);

  try {
    await mongodbClient.connect();
    // await listDatabases(mongodbClient);
    // await createListing(mongodbClient, {
    //   name: 'hoang ho',
    //   sumary: 'Waht to be done!',
    //   bedrooms: 1,
    //   bathroom: 0,
    // });
    // await createMultipleListing(mongodbClient, [
    //   {
    //     name: 'hoang ho 1',
    //     sumary: 'Want to be done!',
    //     bedrooms: Math.ceil(Math.random() * 100),
    //     bathroom: Math.ceil(Math.random() * 100),
    //   },
    //   {
    //     name: 'hoang ho 1',
    //     sumary: 'Want to be done!',
    //     bedrooms: Math.ceil(Math.random() * 100),
    //     bathroom: Math.ceil(Math.random() * 100),
    //   },
    //   {
    //     name: 'hoang ho 1',
    //     sumary: 'Want to be done!',
    //     bedrooms: Math.ceil(Math.random() * 100),
    //     bathroom: Math.ceil(Math.random() * 100),
    //   },
    //   {
    //     name: 'hoang ho 1',
    //     sumary: 'Want to be done!',
    //     bedrooms: Math.ceil(Math.random() * 100),
    //     bathroom: Math.ceil(Math.random() * 100),
    //   },
    //   {
    //     name: 'hoang ho 1',
    //     sumary: 'Want to be done!',
    //     bedrooms: Math.ceil(Math.random() * 100),
    //     bathroom: Math.ceil(Math.random() * 100),
    //   },
    // ]);
    // await findAllListing(mongodbClient)
    // await findListtingWithMinNumBedroomsBathroomsAdnMostRecentReviews(mongodbClient, {
    //   maximumNumberOfResults: 5,
    //   minimumNumberObBathrooms: 6,
    //   minimumNumberObBedrooms: 20,
    // });
    await upsertListingByName(mongodbClient, 'hoang ho 1', {
      livingRooms: 10,
    });
  } catch (error) {
    console.error(error);
  } finally {
    await mongodbClient.close();
  }
}

/**
 *
 * @param {MongoClient} client
 */
async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();
  console.log('Databases:');
  databasesList.databases.forEach((db) => {
    console.log(`-- ${db.name}`);
  });
}

//Creating
/**
 *
 * @param {MongoClient} client
 * @param {Document} newListing
 */
async function createListing(client, newListing) {
  const result = await client.db(SAMPLE_AIRBNB).collection(LISTING_REVIEWS).insertOne(newListing);

  console.log('result: ', result.insertedId);
}
/**
 *
 * @param {MongoClient} client
 * @param {Document []} newListing
 */
async function createMultipleListing(client, newListing) {
  const result = await client.db(SAMPLE_AIRBNB).collection(LISTING_REVIEWS).insertMany(newListing);

  console.log('result: ', result.insertedCount);
}

//Reading

/**
 *
 * @param {MongoClient} client
 */
async function findListtingWithMinNumBedroomsBathroomsAdnMostRecentReviews(
  client,
  {
    minimumNumberObBedrooms = 0,
    minimumNumberObBathrooms = 0,
    maximumNumberOfResults = Number.MAX_SAFE_INTEGER,
  } = {}
) {
  const result = await client
    .db(SAMPLE_AIRBNB)
    .collection(LISTING_REVIEWS)
    .find({
      bedrooms: { $gte: minimumNumberObBedrooms },
      bathroom: { $gte: minimumNumberObBathrooms },
    })
    .sort({ last_review: -1 })
    .limit(maximumNumberOfResults)
    .toArray();

  console.log(result);
}

/**
 *
 * @param {MongoClient} client
 */
async function findAllListing(client) {
  const result = await client.db(SAMPLE_AIRBNB).collection(LISTING_REVIEWS).find({}).toArray();
  console.log(result);
}

//update
/**
 *
 * @param {MongoClient} client
 * @param {string} nameOfListing
 * @param {Document} updatedListing
 */
async function updateListingByName(client, nameOfListing, updatedListing) {
  const result = await client
    .db(SAMPLE_AIRBNB)
    .collection(LISTING_REVIEWS)
    .updateOne({ name: nameOfListing }, { $set: updatedListing });
  console.log('updated', result.modifiedCount);
}

/**
 *
 * @param {MongoClient} client
 * @param {string} nameOfListing
 * @param {Document} updatedListing
 */
async function upsertListingByName(client, nameOfListing, updatedListing) {
  const result = await client
    .db(SAMPLE_AIRBNB)
    .collection(LISTING_REVIEWS)
    .bulkWrite([
      {
        updateOne: {
          upsert: true,
          filter: { name: nameOfListing },
          update: { $set: updatedListing },
        },
      },
    ]);
  console.log(result);
}

module.exports = { app };

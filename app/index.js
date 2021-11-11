const { MongoClient } = require('mongodb');
const SAMPLE_AIRBNB = 'sample_airbnb';
const LISTING_REVIEWS = 'listingAndReviews';
const USER = 'users';

/**
 *
 * Application Index
 * @param {MongoClient} dbClient
 * @returns {Promise<void>}
 */
async function app(dbClient) {
  try {
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
    // await upsertListingByName(mongodbClient, 'hoang ho 1', {
    //   livingRooms: 10,
    // });
    // console.log(
    //   creatReservationDocument('Infinite Views', [new Date('2021-12-31'), new Date('2021-01-01')], {
    //     pricePerNight: 180,
    //     sepecialRequest: 'Late checkout',
    //     breakfastIncluded: true,
    //   })
    // );

    await createReservation(
      dbClient,
      'leslie@example.com',
      'Infinite Views',
      [new Date('2021-12-31'), new Date('2022-01-01')],
      { pricePerNight: 180, specialRequests: 'Late Checkout ', breakfastIncluded: true }
    );
  } catch (error) {
    console.error(error);
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
 * @param {any} newListing
 */
async function createListing(client, newListing) {
  const result = await client.db(SAMPLE_AIRBNB).collection(LISTING_REVIEWS).insertOne(newListing);

  console.log('result: ', result.insertedId);
}
/**
 *
 * @param {MongoClient} client
 * @param {any []} newListing
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
 * @param {any} updatedListing
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
 * @param {any} updatedListing
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
/**
 *
 * @param {MongoClient} client
 * @param {any} newUsers
 */
async function createMultipleUsers(client, newUsers) {
  const result = await client.db(SAMPLE_AIRBNB).collection(USER).insertMany(newUsers);

  console.log(`${result.insertedCount} new user(s) created with the following id(s):`);
  console.log(result.insertedIds);
}

/**
 *
 * Helper function transform data
 * @param {string} nameOfListing
 * @param {Date []} reservationDates
 * @param {any} reservationDetails
 *
 */
function creatReservationDocument(nameOfListing, reservationDates, reservationDetails) {
  let reservation = { name: nameOfListing, date: reservationDates };

  for (let detail in reservationDetails) {
    reservation[detail] = reservationDetails[detail];
  }
  return reservation;
}
/**
 *
 * @param {MongoClient} client
 * @param {string} userEmail
 * @param {string} nameOfListing
 * @param {Date []} reservationDates
 * @param {any} reservationDetails
 */
async function createReservation(
  client,
  userEmail,
  nameOfListing,
  reservationDates,
  reservationDetails
) {
  const userColletion = client.db(SAMPLE_AIRBNB).collection(USER);
  const listingsAndReviewsCollection = client.db(SAMPLE_AIRBNB).collection(LISTING_REVIEWS);
  const reservation = creatReservationDocument(nameOfListing, reservationDates, reservationDetails);

  //transaction
  const session = client.startSession();
  const transactionOptions = {
    readPreference: 'primary',
    readConcern: { level: 'local' },
    writeConcern: { w: 'majority' },
  };
  try {
    const transactionResults = await session.withTransaction(async () => {
      // Important:: You must pass the session to each of the operations

      // Add a reservation to the reservations array for the appropriate document in the users collection
      const usersUpdateResults = await userColletion.updateOne(
        { email: userEmail },
        { $addToSet: { reservations: reservation } },
        { session }
      );
      console.log(
        `${usersUpdateResults.matchedCount} document(s) found in the users collection with the email address ${userEmail}.`
      );
      console.log(
        `${usersUpdateResults.modifiedCount} document(s) was/were updated to include the reservation.`
      );

      // Check if the Airbnb listing is already reserved for those dates. If so, abort the transaction.
      const isListingReservedResults = await listingsAndReviewsCollection.findOne(
        { name: nameOfListing, datesReserved: { $in: reservationDates } },
        { session }
      );
      if (isListingReservedResults) {
        await session.abortTransaction();
        console.error(
          'This listing is already reserved for at least one of the given dates. The reservation could not be created.'
        );
        console.error(
          'Any operations that already occurred as part of this transaction will be rolled back.'
        );
        return;
      }

      //  Add the reservation dates to the datesReserved array for the appropriate document in the listingsAndRewiews collection
      const listingsAndReviewsUpdateResults = await listingsAndReviewsCollection.updateOne(
        { name: nameOfListing },
        { $addToSet: { datesReserved: { $each: reservationDates } } },
        { session }
      );
      console.log(
        `${listingsAndReviewsUpdateResults.matchedCount} document(s) found in the listingsAndReviews collection with the name ${nameOfListing}.`
      );
      console.log(
        `${listingsAndReviewsUpdateResults.modifiedCount} document(s) was/were updated to include the reservation dates.`
      );
      // @ts-ignore
    }, transactionOptions);
    if (transactionResults != undefined) {
      console.log('The reservation was succesfully created');
    } else {
      console.log('The reservation was intentionally aborted');
    }
  } catch (err) {
    console.log('The transaction was aborted due to an unpected error : ', err);
  } finally {
    await session.endSession();
  }
}
module.exports = { app };

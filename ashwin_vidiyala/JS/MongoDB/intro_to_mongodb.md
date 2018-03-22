Create a database called 'my_first_db'.
* use my_first_db

Create students collection.
* db.createCollection('students')

Each document you insert into this collection should have the following format: ({name: STRING, home_state: STRING, lucky_number: NUMBER, birthday: {month: NUMBER, day: NUMBER, year: NUMBER}})
Create 5 students with the appropriate info.
* db.students.insert({name: 'Ashwin', home_state: 'Texas', lucky_number: 13, birthday: {month: 6, day: 14, year: 1990}})
* db.students.insert({name: 'Bob', home_state: 'Arkansas', lucky_number: 7, birthday: {month: 8, day: 10, year: 1980}})
* db.students.insert({name: 'Raj', home_state: 'New York', lucky_number: 5, birthday: {month: 10, day: 10, year: 1975}})
* db.students.insert({name: 'Smith', home_state: 'Kentucky', lucky_number: 117, birthday: {month: 12, day: 27, year: 1995}})
* db.students.insert({name: 'Jose', home_state: 'New Mexico', lucky_number: 91, birthday: {month: 4, day: 24, year: 1989}})

Get all students.
* db.students.find().pretty()

Retrieve all students who are from California (San Jose Dojo) or Washington (Seattle Dojo).
* db.students.find( { $or: [ {home_state: 'California'}, {home_state: 'Washington'} ] } ).pretty()

Get all students whose lucky number is:
* greater than 3
** db.students.find( { lucky_number: { $gt: 3 } } )
* less than or equal to 10
** db.students.find( { lucky_number: { $lte: 10 } } )
* between 1 and 9 (inclusive)
** db.students.find( { lucky_number: { $gt: 1, $lte: 9 } } )

Add a field to each student collection called 'interests' that is an ARRAY.  It should contain the following entries: 'coding', 'brunch', 'MongoDB'. Do this in ONE operation.
* db.students.update( {}, { $set: { interests: ['coding', 'brunch', 'MongoDB'] } }, { upsert: false, multi: true} )

Add some unique interests for each particular student into each of their interest arrays.
* db.students.update( { name: 'Ashwin' }, { $push: { interests: 'salsa dancing' } } )
* db.students.update( { name: 'Bob' }, { $push: { interests: 'shooting' } } )
* db.students.update( { name: 'Raj' }, { $push: { interests: 'programming' } } )
* db.students.update( { name: 'Smith' }, { $push: { interests: 'swimming' } } )
* db.students.update( { name: 'Jose' }, { $push: { interests: 'gardening' } } )

Add the interest 'taxes' into someone's interest array.
* db.students.update( { name: 'Ashwin' }, { $push: { interests: 'taxes' } } )

Remove the 'taxes' interest you just added.
* db.students.update( { name: 'Ashwin' }, { $pull: { interests: 'taxes' } } )

Remove all students who are from California (or Washington).
* db.students.remove( { $or: [ { home_state: 'California' }, { home_state: 'Washington' } ] } )

Remove a student by name.
* db.students.remove( { name: 'Smith' }, true )

Remove a student whose lucky number is greater than 5 (JUST ONE)
* db.students.remove( { lucky_number: { $gt: 5 } }, true )

Add a field to each student collection called 'number_of_belts' and set it to 0.
* db.students.update( {}, { $set: { number_of_belts: 0 } }, false, true )

Increment this field by 1 for all students in Washington (Seattle Dojo).
* db.students.update( {}, { $inc: { number_of_belts: 1 } }, false, true )

Rename the 'number_of_belts' field to 'belts_earned'
* db.students.update( {}, { $rename: { 'number_of_belts': 'belts_earned' } }, false, true )

Remove the 'lucky_number' field.
* db.students.update( {}, { $unset: { lucky_number: "" } }, false, true )

Add a 'updated_on' field, and set the value as the current date.
* db.students.update( {}, { $currentDate: { updated_on: { $type: 'timestamp' } } }, false, true )
* db.students.update( {}, { $currentDate: { updated_on_full: { $type: 'date' } } }, false, true )

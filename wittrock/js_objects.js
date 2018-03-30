let students = [
    {name: 'Remy', cohort: 'Jan'},
    {name: 'Genevieve', cohort: 'March'},
    {name: 'Chuck', cohort: 'Jan'},
    {name: 'Osmund', cohort: 'June'},
    {name: 'Nikki', cohort: 'June'},
    {name: 'Boris', cohort: 'June'}
];
for (let student in students){

  console.log(students[student])
}


	let users = {
    employees: [
        {'first_name' : 'Miguel', 'last_name' : 'Jones'},
        {'first_name' : 'Ernie', 'last_name' : 'Bertson'},
        {'first_name' : 'Nora', 'last_name' : 'Lu'},
        {'first_name' : 'Sally', 'last_name' : 'Barkyoumb'}
    ],
    managers: [
       {'first_name' : 'Lillian', 'last_name' : 'Chambers'},
       {'first_name' : 'Gordon', 'last_name' : 'Poe'}
    ]
 };

for (let x in users){
	let count=1
	cap=x.toUpperCase()
	console.log(cap)
	for (let y in users[x]) {
		let capf=users[x][y].first_name.toUpperCase()
		let capl=users[x][y].last_name.toUpperCase()
		let length=capf.length + capl.length
		
		let str = `${count} - ${capl}, ${capf} - ${length}`
		count++
		console.log(str)

	}
}

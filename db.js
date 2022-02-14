// Task
// 1. Open a database
// 2. Create objectstore. (Can be created only inside upgradeneeded)
// 3.Make transactions
let db;
let openRequest = indexedDB.open("myDataBase");
openRequest.addEventListener("success", (e) => {
	console.log("DB Success");
	db = openRequest.result;

})
openRequest.addEventListener("error", (e) => {
	console.log("DB Error");
})
openRequest.addEventListener("upgradeneeded", (e) => {
	console.log("DB Upgraded and also for initial DB creation");
	db = openRequest.result;

	db.createObjectStore("video",{keyPath:"id"});
	db.createObjectStore("image",{keyPath:"id"});


})


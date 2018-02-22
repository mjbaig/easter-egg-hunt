const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('memory');

db.serialize(() => {
	db.run("create table lorem (info text)");
	
	var statement = db.prepare('insert into lorem values (?)');

	for (var i = 0; i< 10; i++){
		statement.run("Ipsum" + i );
	}

	statement.finalize();

	db.each("select rowid as id, info from lorem", function(error, row){
		console.log(row.id + ": " + row.info);
	});

});

db.close()

'use strict'
const sqlite = require('sqlite');

const databasePromise = sqlite.open('./easter-egg.sqlite', { cached: true, Promise});
/**
 *  id
 *  points
 *  
 */
(async () => {
	try{
        const database = await databasePromise;
        await database.exec(`DROP TABLE IF EXISTS player_scores`);
		await database.exec(`
        CREATE TABLE IF NOT EXISTS player_scores (
				playerId text PRIMARY KEY,
                points integer NOT NULL,
                reportedEggs text
			)
        `);
	} catch(e){ 
		console.log(e.message);
	}
})();

module.exports = databasePromise;
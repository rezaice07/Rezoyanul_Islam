import { Injectable } from '@angular/core';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
//https://ionicframework.com/docs/native/sqlite

import { KeyContainer } from '../../shared';

@Injectable({
    providedIn: 'root'
  })

export class SqlStorageService {
    //public db: SQLiteObject;
    keyContainer: KeyContainer;
    constructor(private sqlite: SQLite) {
        this.keyContainer =<any>{};
    }

    // get(key: string) {
    //     return this.db.executeSql('select key, value from kv where key = ? limit 1', [key]).then(data => {
    //         if (data.rows.length > 0) {
    //             return JSON.parse(data.rows.item(0).value);
    //         }
    //     });
    // }

    // remove(key: string) {
    //     return this.db.executeSql('delete from kv where key = ?', [key]);
    // }


    // add(key: string, value: string,artist_name, song_name) {
    //     let data = [key, value];
    //     return this.db.executeSql('INSERT INTO KV (artist_name, song_name) VALUES (?, ?)', data)
    //     .then(res => {
    //       //here we can add any method for getting data or to print data to console.
    //     });
    //   }

    set(key: string, value: string) {

        return this.sqlite.create({
            name: 'data.db',
            location: 'default'
          })
            .then((db: SQLiteObject) => {          
                    db.executeSql('insert or replace into kv(key, value) values (?, ?)', [key, value]).then(data => {
                    if (data.rows.length > 0) {
                        return JSON.parse(data.rows.item(0).value);
                    }
                });

            //   db.executeSql('create table danceMoves(name VARCHAR(32))', [])
            //     .then(() => console.log('Executed SQL'))
            //     .catch(e => console.log(e));          
          
            })
            .catch(e => console.log(e));
    }

    // getAll() {
    //     return this.db.executeSql('SELECT key, value FROM kv', []).then(data => {
    //         let results = [];
    //         for (let i = 0; i < data.rows.length; i++) {
    //             results.push(JSON.parse(data.rows.item(i).value));
    //         }
    //         return results;
    //     });
    // }


    // /**
    //  * Should be called after deviceready event is fired
    //  */
    // initializeDatabase() {
    //     var obj={};
    //     this.db = new SQLiteObject(obj);
    //     return this.db.openDBs({ name: 'DCDb_data.db', location: 'default' }).then((db) => {
    //         return this.db.executeSql('CREATE TABLE IF NOT EXISTS kv (key text primary key, value text)', []).then(data => {
    //             console.log('**after CREATE TABLE check', data);
    //         });
    //     });
    // }
}
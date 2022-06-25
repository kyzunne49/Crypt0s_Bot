const fetch = require ('node-fetch');
const cheerio = require ('cheerio');
const fs = require ('fs');
const readlineSync = require ('readline-sync');
const chalk = require ('chalk');
const moment = require ('moment');
const proxy = require("node-global-proxy").default;

// const IP = () => new Promise ((resolve, reject) => {
//     fetch ('https://ipv4.icanhazip.com', {
//         method: 'GET',
//     })
//     .then (ress => ress.text())
//     .then ( result => {
//         resolve (result)
//     })
//    .catch (err => reject (err))
// });




const getData = () => new Promise((resolve,reject)=>{
    fetch('https://name-fake.com/id_ID', {
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0) Gecko/20100101 Firefox/99.0',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-GB,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            'DNT': '1',
            'Connection': 'keep-alive',
            'Cookie': 'PHPSESSID=78fd62f29ab0d35bb777ca6edfffb335; prefetchAd_2861429=true',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1',
            'TE': 'trailers'
        }
 })
 .then(ress => ress.text())
 .then(async result => {
     const $ = await cheerio.load(result);
    const firstName = $('div[id=copy1]').text();
    const lastName = $('div[id=copy2]').text();
    const ressEmail = $('div[id=copy4]').text().split("@");
    const dnsEmail = ressEmail[0] + Math.floor(Math.random() * 1000)+ "@getnada.com";
    
     resolve({
         firstName: firstName,
         lastName: lastName,
         email: dnsEmail
     })
 }).catch(err => reject(err))
});

const submitData  = (email) => new Promise ((resolve, reject) => {
    fetch ('https://cryptoys-api-demo.herokuapp.com/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Sec-Ch-Ua-Mobile': '?0',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.53 Safari/537.36',
            'Sec-Ch-Ua-Platform': '"Windows"',
            'Origin': 'https://cryptoys.com',
            'Sec-Fetch-Site': 'cross-site',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Referer': 'https://cryptoys.com/',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'en-US,en;q=0.9',
        },
        body: JSON.stringify({
            "email":email
        })
    })
    .then (res => res.text())
    .then (result => {
        resolve (result)
    })
    .catch (err => reject (err))
});

(async () => {

    console.log('=====> Bot Automation Submit Data <=====');
    console.log('Website : https://cryptoys.com');
    console.log('');
    console.log(`Created Code BY`, chalk.red(`HR Network Code ID`));
    console.log('IP Address Proxy, Cache Data Required');
    console.log(`Buy Code Multi Thread :`, chalk.green(`https://hr-network.my.id`));
    console.log('');

   
// const checkIPnya = await checkIP();
// if (!checkIPnya === true) {
//     console.log(`IP Proxy Monitoring Successfull `);
// } else {
//     console.log(`IP proxy Diedd`);
// }
    // console.log(checkIpnya);

const berapaInputan = readlineSync.question('Mau Berapa Buat Akun >? ');

for (let index = 0; index < parseInt(berapaInputan); index++) {
    const getDatanya = await getData();
    const getEmail = getDatanya.email;

    const submitDatanya = await submitData(getEmail);
    console.log(`[ ${moment().format("HH:mm:ss")} ]`, chalk.green(`Register Email Successfull`));

    const dataResult = fs.appendFileSync('dataakun.txt', `${getEmail} \n`);

    console.log(`[ ${moment().format("HH:mm:ss")}]`, chalk.green(`Data Berhasil disend`));
    
}


})();
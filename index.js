//Robo maluco que envia fotos malucas....apenas brincando.

const wa = require('@open-wa/wa-automate');
const puppeteer = require('puppeteer');
const imageToBase64 = require('image-to-base64');

// const urlBase='http://pornsex-pics.com/ppi-fucking';

const urlBase='http://www.girlxxxphotos.com/';
// const urlBase='https://www.google.com/search?q=xxx+porn&tbm=isch&ved=2ahUKEwj47MDSvoLqAhWI1eAKHRlZAlYQ2-cCegQIABAA&oq=xxx+porn&gs_lcp=CgNpbWcQAzoCCABQhaICWP_WAmD92wJoAHAAeAKAAe0FiAH_MpIBCTMtNi41LjEuMpgBAKABAaoBC2d3cy13aXotaW1nsAEA&sclient=img&ei=xLbmXvj6H4irgweZsomwBQ&bih=663&biw=1366';

//1ª Arma- Preciso de uma arma para fazer scrape

let scrape = async () => {
    try{
  const browser = await puppeteer.launch({
    headless: true
})
  const page = await browser.newPage()
  await page.goto(urlBase,  {
      waitUntil: 'load',
  // Remove the timeout
  timeout: 0
});
  const result = await page.$$eval('img', titles =>
    titles.map(titles => titles.getAttribute('src'))
  )
  browser.close()
  return result
}
catch (err) {
    console.log(err);
  }
}

// 2ª arma - Preciso de outra que converte imagens para  a base 64    
const getBase64Img= async()=>{
    try{
    const value = await scrape();
    console.log(value);
    const result=[];
    for(i=1; i<=value.length;i++){
        if(value[i]){
    const img = await imageToBase64(value[i]);
    const  imageBase64 =  'data:image/jpeg;base64,'+ img;

     result.push(imageBase64);
    }
}
    return result;
  }  catch(err){
    console.log(err);
}
}
// 3ª Arma - Preciso de uma a arma para mandar a imagem para o WhatsApp da pessoa
const sendContent=async (client)=>{
    const imgs = await getBase64Img();
    console.log(imgs);
    for(i=1; i<imgs.length;i++){
           await client.sendImage(
               '',
               imgs[i],
               'image'+i+'.jpeg',
               `Sorry for this, but you ordered 😋`
             );
}
sendContent(client);
}
//BoooooommmMMmm 
wa.create().then(client=>sendContent(client))
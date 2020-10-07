const moment = require('moment');
moment.locale("ru");
const path = require('path');

const puppeteer = require('puppeteer');

let m_add_num;
module.exports = async function start_border_calendar(start_num){

  m_add_num = m_add_num || start_num || 0;
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
      width: 1046,
      height: 755
  });

  await page.goto(`http://${process.env.EXPRESS_IP}:${process.env.EXPRESS_PORT}/gtk_tt?m=${m_add_num}&hide_control=1`);
  let data_block = await page.$eval("#data_block", element => element.textContent);
  let file_name = await page.$eval("#file_name", element => element.textContent);
  
  let file_path = path.join(process.env.DIR, "border_calendar_png", "general", `${file_name}.png`)
  let r = await page.screenshot({
    path: file_path,
    clip: { x: 0, y: 0, width: 1046, height: Number(data_block) }
  });

  console.log(file_path)

  await page.goto(`http://${process.env.EXPRESS_IP}:${process.env.EXPRESS_PORT}/tt_masty?m=${m_add_num}&hide_control=1`);
  file_name = await page.$eval("#file_name", element => element.textContent);

  file_path = path.join(process.env.DIR, "border_calendar_png", "masty", `${file_name}.png`)
  r = await page.screenshot({
    path: file_path,
    clip: { x: 0, y: 0, width: 1046, height: Number(data_block) }
  });

  console.log(file_path)
  
  await page.goto(`http://${process.env.EXPRESS_IP}:${process.env.EXPRESS_PORT}/tt_nums?m=${m_add_num}&hide_control=1`);
  file_name = await page.$eval("#file_name", element => element.textContent);

  file_path = path.join(process.env.DIR, "border_calendar_png", "number", `${file_name}.png`)
  r = await page.screenshot({
    path: file_path,
    clip: { x: 0, y: 0, width: 1046, height: Number(data_block) }
  });

  console.log(file_path)

  await browser.close();
  m_add_num++
};
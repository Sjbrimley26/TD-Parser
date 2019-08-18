import scss from "./main.scss"
import Papa from "papaparse"
import { range } from "sjb-utils/Arrays"
import { Random } from "sjb-utils"
import { Sheet } from "./sheetsApi";
import { once } from "sjb-utils/Functions"

const $input = document.getElementById("input");
const $parsed = document.getElementById("parsed");

let sheet;

const setHeaders = once((headers) => {
  sheet = new Sheet(null, headers);
});

$input.addEventListener("change", e => {
  Papa.parse($input.files[0], {
    header: true,

    step: function(row) {
      setHeaders(Object.keys(row.data));
      sheet.append(row.data);
    },

    complete: function() {
      console.log(sheet)
      $parsed.appendChild(sheet.createTable())
    }
  })
})
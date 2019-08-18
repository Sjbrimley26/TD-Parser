import { range, tail } from "sjb-utils/Arrays"
import { LinkedList, Node } from "./LinkedList"

const alphabet = range(65, 91, 1, x => String.fromCharCode(x))

function Sheet(sheetID, headers) {
  LinkedList.call(this);

  this.url = `https://docs.google.com/spreadsheets/d/${sheetID}/edit#gid=0`

  this.headers = headers;

  this.append = function(x) {
    LinkedList.prototype.append.call(this, new SRow(x, this.size));
  }

  this.findRow = function(fn) {
    let searching = true;
    let node = this.head;
    while (searching) {
      if (node == null) return undefined;
      if (fn(node)) return node.value;
      node = this.next;
    }
  }

  this.createTable = function() {
    const table = document.createElement("table");
    const headerRow = document.createElement("tr");
    this.headers.forEach(h => {
      const th = document.createElement("th");
      th.textContent = h;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
    let node = this.head;
    while(node) {
      const tr = document.createElement("tr");
      Object.values(node.value).forEach(d => {
        const td = document.createElement("td");
        td.textContent = d;
        tr.appendChild(td);
      });
      table.appendChild(tr);
      node = node.next;
    }
    return table;
  }
}

Sheet.prototype = Object.create(LinkedList.prototype)

Object.defineProperties(Sheet.prototype, {
  range: {
    get: function() {
      const r1 = this.head.range
      const i2 = this.tail.index
      const el = alphabet[this.headers.length - 1]
      const rs = r1.slice(0, r1.indexOf(":"))
      return `${rs}:${el + i2}`;
    }
  }
})

function SRow(json, index) {
  Node.call(this, json, index);
}

SRow.prototype = Object.create(Node.prototype)

Object.defineProperties(SRow.prototype, {
  range: {
    get: function() {
      const i = this.index + 2;
      const rs = `A${i}`
      const el = alphabet[Object.keys(this.value).length - 1]
      const re = `${el}${i}`;
      return `${rs}:${re}`
    }
  }
})


export {
  Sheet
}


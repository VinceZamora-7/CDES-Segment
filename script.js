// Static data arrays for segments and sub-segments
const segmentsDataStatic = [
  {
    name: "Enterprise Digital Natives",
    tag: "Mapped",
    description: "New Mapped to “Enterprise Commercial” Summary Segment",
  },
  {
    name: "Majors Growth Commercial",
    tag: "Mapped",
    description: "New Mapped to “Enterprise Commercial” Summary Segment",
  },
  {
    name: "Majors Growth Public Sector",
    tag: "Mapped",
    description: "New Mapped to “Enterprise Public Sector” Summary Segment",
  },
  {
    name: "SME&C - SMB Commercial",
    tag: "Mapped",
    description: "New Mapped to “SME&C Commercial” Summary Segment",
  },
  {
    name: "SME&C - SMB Public Sector",
    tag: "Mapped",
    description: "New Mapped to “SME&C Public Sector” Summary Segment",
  },
  {
    name: "Major Commercial",
    tag: "Renamed",
    description: "Renamed to “Upper Majors Commercial”",
  },
  {
    name: "Major Public Sector  ",
    tag: "Renamed",
    description: "Renamed to “Upper Majors Public Sector”",
  },
  {
    name: "Small, Medium & Corporate Commercial",
    tag: "Renamed",
    description: "Renamed to “SME&C - Corporate Commercial”",
  },
  {
    name: "Small, Medium & Corporate Public Sector",
    tag: "Renamed",
    description: "Renamed to “SME&C - Corporate Public Sector”",
  },
];

const subSegmentsDataStatic = [
  {
    name: "Digital Natives",
    tag: "Mapped",
    description: "New. Mapped to “Enterprise Digital Natives” Segment",
  },
  {
    name: "Majors Growth - Commercial",
    tag: "Mapped",
    description: "New. Mapped to “Majors Growth Commercial” Segment",
  },
  {
    name: "Majors Growth - Public Sector",
    tag: "Mapped",
    description: "New. Mapped to “Majors Growth Public Sector” Segment",
  },
  {
    name: "SME&C - Corporate K14",
    tag: "Mapped",
    description: "New. Mapped to “SME&C - Corporate Public Sector” Segment",
  },
  {
    name: "SME&C - Corporate TSI",
    tag: "Mapped",
    description: "New. Mapped to “SME&C - Corporate Commercial” Segment",
  },
  {
    name: "Major - Commercial Other",
    tag: "Renamed",
    description: 'Renamed to "Upper Majors - Commercial"',
  },
  {
    name: "Major - Education",
    tag: "Renamed",
    description: "Renamed to “Upper Majors - Education”",
  },
  {
    name: "Major - Federal Government",
    tag: "Renamed",
    description: "Renamed to “Upper Majors - Federal Government”",
  },
  {
    name: "Major - Government Other",
    tag: "Renamed",
    description: "Renamed to “Upper Majors - Government”",
  },
  {
    name: "SM&C Commercial - Corporate",
    tag: "Renamed",
    description: 'Renamed to "SME&C - Corporate Commercial"',
  },
  {
    name: "SM&C Commercial - SMB",
    tag: "Renamed",
    description: 'Renamed to "SME&C - SMB Commercial"',
  },
  {
    name: "SM&C Commercial - SMB Default",
    tag: "Renamed",
    description: 'Renamed to "SME&C - SMB Default"',
  },
  {
    name: "SM&C Education - Corporate",
    tag: "Renamed",
    description: 'Renamed to "SME&C - Corporate Education"',
  },
  {
    name: "SM&C Education - SMB",
    tag: "Renamed",
    description: 'Renamed to "SME&C - SMB Education"',
  },
  {
    name: "SM&C Government - Corporate",
    tag: "Renamed",
    description: 'Renamed to "SME&C - Corporate Government"',
  },
  {
    name: "SM&C Government - SMB",
    tag: "Renamed",
    description: 'Renamed to "SME&C - SMB Government"',
  },
  {
    name: "Strategic - Commercial Other",
    tag: "Renamed",
    description: 'Renamed to "Strategic - Commercial "',
  },
  { name: "Major - Health", tag: "Deleted", description: "Deleted" },
  {
    name: "Major - State & Local Governments",
    tag: "Deleted",
    description: "Deleted",
  },
  { name: "Strategic - Health", tag: "Deleted", description: "Deleted" },
  {
    name: "SME&C Commercial – SMB Default",
    tag: "Remap",
    description: "Remap to SME&C - SMB Commercial Segment",
  },
  {
    name: "SME&C - SMB Commercial",
    tag: "Remap",
    description: "Remap to SME&C - SMB Commercial Segment",
  },
  {
    name: "SME&C - SMB Education",
    tag: "Remap",
    description: "Remap to SME&C - SMB Public Sector Segment",
  },
  {
    name: "SME&C - SMB Government",
    tag: "Remap",
    description: "Remap to SME&C - SMB Public Sector Segment",
  },
];

// Utility functions
const decodeHtmlEntities = (text) => {
  const el = document.createElement("textarea");
  el.innerHTML = text;
  return el.value;
};

const normalizeText = (text) => {
  if (!text) return "";
  return decodeHtmlEntities(text).replace(/[-–—]/g, "-").trim().toLowerCase();
};

const extractTextInQuotes = (text) => {
  const m = text.match(/[“"”](.*?)[”"]/);
  return m ? m[1].trim() : null;
};

const getTextOutsideParentheses = (text) =>
  text.replace(/\s*\([^)]*\)/g, "").trim();

const isAllSegmentInParentheses = (text) => {
  const m = text.match(/\(([^)]+)\)/);
  if (!m) return false;
  const val = m[1].toLowerCase();
  return val === "all segment" || val === "all segments";
};

const clearHighlights = (tbody) => {
  Array.from(tbody.rows).forEach((row) => {
    row.classList.remove("highlight-name", "mapped", "renamed", "remap");
  });
};

function createTable(data, headers) {
  const table = document.createElement("table");
  table.id = headers[0].toLowerCase().replace(/\s/g, "") + "Table";
  table.setAttribute("aria-label", headers.join(" & ") + " Table");
  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");
  headers.forEach((h) => {
    const th = document.createElement("th");
    th.textContent = h;
    trHead.appendChild(th);
  });
  thead.appendChild(trHead);
  table.appendChild(thead);
  const tbody = document.createElement("tbody");
  data.forEach((item) => {
    const tr = document.createElement("tr");
    tr.setAttribute(
      "data-status",
      item.tag ? item.tag.toLowerCase() : "unknown"
    );
    const tdName = document.createElement("td");
    tdName.textContent = item.name;
    const tdDesc = document.createElement("td");
    tdDesc.textContent = item.description;
    tr.appendChild(tdName);
    tr.appendChild(tdDesc);
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  return table;
}

// Declare global variables for tables and results
let segmentsTable;
let subSegmentsTable;

let finalSubSegResults = [];
let finalSegResults = [];

let finalVerticalResults = [];
let finalIndustryResults = [];

document.addEventListener("DOMContentLoaded", () => {
  // build tables
  segmentsTable = createTable(segmentsDataStatic, ["Segment", "Description"]);
  subSegmentsTable = createTable(subSegmentsDataStatic, [
    "Sub-segment",
    "Description",
  ]);
  document.getElementById("segmentsTableContainer").appendChild(segmentsTable);
  document
    .getElementById("subSegmentsTableContainer")
    .appendChild(subSegmentsTable);

  // attach button event handlers with debugging
  const btnSegment = document.getElementById("processButton");
  if (btnSegment) {
    console.log("Attaching processButton click");
    btnSegment.addEventListener("click", () => {
      console.log("processButton clicked");
      processInput();
    });
  }
  const btnIndustry = document.getElementById("industryProcessButton");
  if (btnIndustry) {
    console.log("Attaching industryProcessButton click");
    btnIndustry.addEventListener("click", () => {
      console.log("industryProcessButton clicked");
      processIndustryInput();
    });
  }

  document.getElementById("copySubSegment").onclick = () => {
    navigator.clipboard
      .writeText(finalSubSegResults.join("\n"))
      .then(() => alert("Sub-segment results copied."));
  };
  document.getElementById("copySegment").onclick = () => {
    navigator.clipboard
      .writeText(finalSegResults.join("\n"))
      .then(() => alert("Segment results copied."));
  };
  document.getElementById("copyVertical").onclick = () => {
    navigator.clipboard
      .writeText(finalVerticalResults.join("\n"))
      .then(() => alert("Vertical results copied."));
  };
  document.getElementById("copyIndustry").onclick = () => {
    navigator.clipboard
      .writeText(finalIndustryResults.join("\n"))
      .then(() => alert("Industry results copied."));
  };

  // toggle section visibility
  const radios = document.querySelectorAll('input[name="toolChoice"]');
  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio.value === "segment") {
        document
          .getElementById("segmentToolSection")
          .classList.remove("hidden");
        document.getElementById("industryToolSection").classList.add("hidden");
      } else {
        document
          .getElementById("industryToolSection")
          .classList.remove("hidden");
        document.getElementById("segmentToolSection").classList.add("hidden");
      }
    });
  });
});

function processInput() {
  const rawInput = document.getElementById("userInput").value.trim();
  const inputListContainer = document.getElementById("inputList");
  const finalSubSegOutput = document.getElementById("finalSubSegmentOutput");
  const finalSegOutput = document.getElementById("finalSegmentOutput");

  inputListContainer.innerHTML = "";
  finalSubSegOutput.innerHTML = "";
  finalSegOutput.innerHTML = "";
  finalSubSegResults = [];
  finalSegResults = [];

  if (!rawInput) {
    inputListContainer.innerHTML = "<p>No input provided.</p>";
    return;
  }

  clearHighlights(segmentsTable.tBodies[0]);
  clearHighlights(subSegmentsTable.tBodies[0]);

  const rawItems = rawInput.split(",").map((i) => i.trim());

  const segmentsData = Array.from(segmentsTable.tBodies[0].rows).map((row) => ({
    rowElem: row,
    nameOriginal: row.cells[0].textContent,
    name: normalizeText(row.cells[0].textContent),
    description: row.cells[1].textContent,
    descriptionQuote: normalizeText(
      extractTextInQuotes(row.cells[1].textContent)
    ),
    status: {
      type: row.getAttribute("data-status"),
      className: row.getAttribute("data-status"),
    },
  }));

  const subSegmentsData = Array.from(subSegmentsTable.tBodies[0].rows).map(
    (row) => ({
      rowElem: row,
      nameOriginal: row.cells[0].textContent,
      name: normalizeText(row.cells[0].textContent),
      description: row.cells[1].textContent,
      descriptionQuote: normalizeText(
        extractTextInQuotes(row.cells[1].textContent)
      ),
      status: {
        type: row.getAttribute("data-status"),
        className: row.getAttribute("data-status"),
      },
    })
  );

  const resultUl = document.createElement("ul");

  for (const rawVal of rawItems) {
    const parenMatch = rawVal.match(/\(([^)]+)\)/);
    const treatAsSegment = !parenMatch || isAllSegmentInParentheses(rawVal);
    const valToMatchNormalized = treatAsSegment
      ? normalizeText(getTextOutsideParentheses(rawVal))
      : normalizeText(parenMatch[1].trim());

    let matchSeg = null;
    let matchSub = null;

    if (treatAsSegment) {
      matchSeg = segmentsData.find(
        (d) =>
          d.name === valToMatchNormalized ||
          d.descriptionQuote === valToMatchNormalized
      );
    }

    if (!treatAsSegment && parenMatch) {
      matchSub = subSegmentsData.find(
        (d) =>
          d.name === valToMatchNormalized ||
          d.descriptionQuote === valToMatchNormalized
      );

      if (!matchSub) {
        const renamedSub = subSegmentsData.find(
          (d) =>
            d.status.type === "renamed" &&
            normalizeText(d.description).includes(valToMatchNormalized)
        );
        if (renamedSub) matchSub = renamedSub;
      }
    }

    const li = document.createElement("li");

    if (treatAsSegment) {
      const displayText = getTextOutsideParentheses(rawVal);
      li.textContent = displayText;

      if (matchSeg) {
        matchSeg.rowElem.classList.add(
          "highlight-name",
          matchSeg.status.className
        );
        const descSpan = document.createElement("span");
        descSpan.classList.add("found-description");
        descSpan.textContent = ` (Segment) – ${matchSeg.description}`;
        li.appendChild(descSpan);
      } else {
        li.textContent += " – No segment match found";
      }

      finalSegResults.push(matchSeg ? matchSeg.nameOriginal : displayText);
      resultUl.appendChild(li);
      continue;
    }

    li.textContent = valToMatchNormalized;

    if (matchSub) {
      matchSub.rowElem.classList.add(
        "highlight-name",
        matchSub.status.className
      );
      li.classList.add(matchSub.status.className);
      const descSpan = document.createElement("span");
      descSpan.classList.add("found-description");
      descSpan.textContent = ` (Sub-segment) – ${matchSub.description}`;
      li.appendChild(descSpan);
    }

    if (matchSeg) {
      matchSeg.rowElem.classList.add(
        "highlight-name",
        matchSeg.status.className
      );
      const descSpan = document.createElement("span");
      descSpan.classList.add("found-description");
      descSpan.textContent = ` (Segment) – ${matchSeg.description}`;
      li.appendChild(descSpan);
    }

    if (!matchSub && !matchSeg && parenMatch) {
      li.textContent = `${parenMatch[1]} – No match found`;
      finalSubSegResults.push(parenMatch[1]);
      resultUl.appendChild(li);
      continue;
    }

    resultUl.appendChild(li);

    if (!matchSeg && matchSub) {
      if (
        matchSub.status.type === "mapped" ||
        matchSub.status.type === "renamed"
      ) {
        finalSubSegResults.push(matchSub.nameOriginal);
      } else if (matchSub.status.type === "remap") {
        finalSubSegResults.push(matchSub.nameOriginal);
      } else {
        finalSubSegResults.push(matchSub.nameOriginal);
      }
    }

    if (matchSeg) {
      if (
        matchSeg.status.type === "mapped" ||
        matchSeg.status.type === "renamed"
      ) {
        finalSegResults.push(matchSeg.nameOriginal);
      } else if (matchSeg.status.type === "remap") {
        finalSegResults.push(matchSeg.nameOriginal);
      } else {
        finalSegResults.push(matchSeg.nameOriginal);
      }
    }
  }

  inputListContainer.appendChild(resultUl);

  finalSubSegOutput.innerHTML = finalSubSegResults.length
    ? `<ul>${finalSubSegResults.map((txt) => `<li>${txt}</li>`).join("")}</ul>`
    : "<p>No sub-segment matches found.</p>";

  finalSegOutput.innerHTML = finalSegResults.length
    ? `<ul>${finalSegResults.map((txt) => `<li>${txt}</li>`).join("")}</ul>`
    : "<p>No segment matches found.</p>";

  document.getElementById(
    "subSegmentCount"
  ).textContent = `Count: ${finalSubSegResults.length}`;
  document.getElementById(
    "segmentCount"
  ).textContent = `Count: ${finalSegResults.length}`;
}

function processIndustryInput() {
  const rawInput = document.getElementById("industryUserInput").value.trim();
  const inputListContainer = document.getElementById("industryInputList");
  const finalVerticalOutput = document.getElementById("finalVerticalOutput");
  const finalIndustryOutput = document.getElementById("finalIndustryOutput");

  inputListContainer.innerHTML = "";
  finalVerticalOutput.innerHTML = "";
  finalIndustryOutput.innerHTML = "";
  finalVerticalResults = [];
  finalIndustryResults = [];

  if (!rawInput) {
    inputListContainer.innerHTML = "<p>No input provided.</p>";
    return;
  }

  // Split input into trimmed lines
  let rawItems = rawInput.split(",").map((i) => i.trim());

  // Process each item: remove "(Deprecated)" substring (case insensitive) but still keep the rest for matching
  const cleanedItems = rawItems.map((i) =>
    i.replace(/\(Deprecated\)/gi, "").trim()
  );

  // Identify industries with (All Verticals) in cleaned items
  const industriesWithAllVerticals = new Set();
  cleanedItems.forEach((i) => {
    const parenMatch = i.match(/\(([^)]+)\)/);
    if (parenMatch && parenMatch[1].trim().toLowerCase() === "all verticals") {
      industriesWithAllVerticals.add(
        getTextOutsideParentheses(i).toLowerCase()
      );
    }
  });

  // Filter out verticals of industries with (All Verticals)
  const filteredItems = cleanedItems.filter((i) => {
    const parenMatch = i.match(/\(([^)]+)\)/);
    if (!parenMatch) return true;
    const parenContent = parenMatch[1].trim().toLowerCase();
    const baseName = getTextOutsideParentheses(i).toLowerCase();
    if (parenContent === "all verticals") return true;
    if (industriesWithAllVerticals.has(baseName)) return false;
    return true;
  });

  // Deduplicate output arrays
  const dedupIndustry = new Set();
  const dedupVertical = new Set();
  const ul = document.createElement("ul");

  filteredItems.forEach((i) => {
    const parenMatch = i.match(/\(([^)]+)\)/);
    const inputTextNoParen = getTextOutsideParentheses(i);
    const parenText = parenMatch ? parenMatch[1].trim() : null;

    const li = document.createElement("li");

    if (parenText && parenText.toLowerCase() === "all verticals") {
      if (!dedupIndustry.has(inputTextNoParen.toLowerCase())) {
        li.textContent = inputTextNoParen + " (Industry)";
        finalIndustryResults.push(inputTextNoParen);
        dedupIndustry.add(inputTextNoParen.toLowerCase());
      } else {
        return; // skip duplicate
      }
    } else if (parenText) {
      if (!dedupVertical.has(parenText.toLowerCase())) {
        li.textContent = parenText + " (Vertical)";
        finalVerticalResults.push(parenText);
        dedupVertical.add(parenText.toLowerCase());
      } else {
        return; // skip duplicate
      }
    } else {
      li.textContent = `${i} – No parentheses found, cannot determine Industry or Vertical`;
    }

    ul.appendChild(li);
  });

  inputListContainer.appendChild(ul);

  finalVerticalOutput.innerHTML = finalVerticalResults.length
    ? `<ul>${finalVerticalResults
        .map((txt) => `<li>${txt}</li>`)
        .join("")}</ul>`
    : "<p>No vertical matches found.</p>";

  finalIndustryOutput.innerHTML = finalIndustryResults.length
    ? `<ul>${finalIndustryResults
        .map((txt) => `<li>${txt}</li>`)
        .join("")}</ul>`
    : "<p>No industry matches found.</p>";

  document.getElementById(
    "verticalCount"
  ).textContent = `Count: ${finalVerticalResults.length}`;
  document.getElementById(
    "industryCount"
  ).textContent = `Count: ${finalIndustryResults.length}`;
}

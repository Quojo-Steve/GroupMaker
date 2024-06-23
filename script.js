const groupNames = [
  "Alpha Squad",
  "Beta Group",
  "Gamma Team",
  "Delta Force",
  "Epsilon Unit",
  "Zeta Crew",
  "Eta Division",
  "Theta Party",
  "Iota Band",
  "Kappa Assembly",
  "Lambda Bunch",
  "Mu Cluster",
  "Nu Pack",
  "Xi Fleet",
  "Omicron Faction",
  "Pi Gang",
  "Rho Troop",
  "Sigma Brigade",
  "Tau Company",
  "Upsilon Regiment",
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// function generateGroups() {
//   const fileInput = document.getElementById("fileInput");
//   const numGroups = document.getElementById("numGroups").value;
//   const groupSize = document.getElementById("groupSize").value;

//   if (!fileInput.files.length) {
//     alert("Please upload a file");
//     return;
//   }

//   const file = fileInput.files[0];
//   const reader = new FileReader();

//   reader.onload = function (event) {
//     const content = event.target.result;
//     const lines = content.split("\n").filter((line) => line.trim() !== "");
//     let groups = [];

//     if (numGroups) {
//       groups = Array.from({ length: numGroups }, () => []);
//       for (let i = 0; i < lines.length; i++) {
//         groups[i % numGroups].push(lines[i]);
//       }
//     } else if (groupSize) {
//       let currentGroup = [];
//       for (let i = 0; i < lines.length; i++) {
//         currentGroup.push(lines[i]);
//         if (currentGroup.length === parseInt(groupSize)) {
//           groups.push(currentGroup);
//           currentGroup = [];
//         }
//       }
//       if (currentGroup.length) groups.push(currentGroup);
//     }

//     const shuffledGroupNames = shuffleArray(groupNames.slice());
//     displayResults(groups, shuffledGroupNames);
//   };

//   reader.readAsText(file);
// }

function generateGroups() {
    const fileInput = document.getElementById("fileInput");
    const numGroups = document.getElementById("numGroups").value;
    const groupSize = document.getElementById("groupSize").value;
    const ignoreFirstRow = document.getElementById("ignoreFirstRow").checked;

    if (!fileInput.files.length) {
        alert("Please upload a file");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const content = event.target.result;
        let lines = content.split("\n").filter((line) => line.trim() !== "");

        // If ignoreFirstRow is checked, skip the first row
        if (ignoreFirstRow) {
            lines = lines.slice(1);
        }

        let groups = [];

        if (numGroups) {
            groups = Array.from({ length: numGroups }, () => []);
            for (let i = 0; i < lines.length; i++) {
                groups[i % numGroups].push(lines[i]);
            }
        } else if (groupSize) {
            let currentGroup = [];
            for (let i = 0; i < lines.length; i++) {
                currentGroup.push(lines[i]);
                if (currentGroup.length === parseInt(groupSize)) {
                    groups.push(currentGroup);
                    currentGroup = [];
                }
            }
            if (currentGroup.length) groups.push(currentGroup);
        }

        const shuffledGroupNames = shuffleArray(groupNames.slice());
        displayResults(groups, shuffledGroupNames);
    };

    reader.readAsText(file);
}


function displayResults(groups, shuffledGroupNames) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    groups.forEach((group, index) => {
        const groupDiv = document.createElement("div");
        groupDiv.classList.add("group");
        const groupName = shuffledGroupNames[index] ? shuffledGroupNames[index] : `Group ${index + 1}`;
        groupDiv.innerHTML = `<h3>${groupName}</h3><div class="group-members">${group.map(member => `<div>${member}</div>`).join('')}</div>`;
        resultsDiv.appendChild(groupDiv);
    });
}


function downloadResults() {
    const resultsDiv = document.getElementById("results");
    const groups = resultsDiv.getElementsByClassName("group");

    // Check if there are any groups available
    if (groups.length === 0) {
        alert("There are no results to download.");
        return;
    }

    let resultText = "";

    // Iterate through each group
    for (let i = 0; i < groups.length; i++) {
        const groupName = groups[i].querySelector("h3").innerText;
        const groupMembers = groups[i].querySelectorAll(".group-members div");
        
        resultText += `${groupName}:\n`;

        // Iterate through each member of the group
        groupMembers.forEach(member => {
            resultText += `${member.innerText}\n`;
        });

        resultText += "\n";
    }

    const blob = new Blob([resultText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "groups.txt";
    a.click();
    URL.revokeObjectURL(url);
}



function scrollDown() {
  window.scrollTo({
    top: document.querySelector(".upload-section").offsetTop,
    behavior: "smooth",
  });
}

const uploadSection = document.getElementById("uploadSection");

uploadSection.addEventListener("dragover", function (e) {
    e.preventDefault();
    uploadSection.classList.add("dragover");
});

uploadSection.addEventListener("dragleave", function () {
    uploadSection.classList.remove("dragover");
});

uploadSection.addEventListener("drop", function (e) {
    e.preventDefault();
    uploadSection.classList.remove("dragover");

    const files = e.dataTransfer.files;

    // Assuming you want to handle only one file
    if (files.length > 0) {
        const file = files[0];

        const reader = new FileReader();

        reader.onload = function (event) {
            console.log("File content:", event.target.result);
            // Proceed with your file handling logic here
        };

        reader.readAsText(file);
    }
});

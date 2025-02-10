// const uploadFileInput = document.getElementById('uploadFile');
// const fileNameDisplay = document.getElementById('fileName');

//
// fileUploader.addEventListener('input', (event) => {
//
//   const feedback = document.getElementById('fileName');
//   feedback.textContent = 'change';
//   document.getElementsByClassName('file-box').item(0).style.display = 'none';
// });
//
// fileUploader.addEventListener('change', (event) => {
//   // const files = event.target.files;
//   // console.log('files', files);
//
//   const feedback = document.getElementById('fileName');
//   feedback.textContent = 'change';
//   document.getElementsByClassName('file-box').item(0).style.display = 'none';
// });



document.addEventListener('DOMContentLoaded', () => {
  // localStorage.clear();

  const dashboardCommand = document.getElementById("totalCommand");
  let currentCommand = parseFloat(localStorage.getItem('totalCommand') || parseFloat(dashboardCommand.textContent));
  dashboardCommand.textContent = currentCommand.toString();

  const fileUploader = document.getElementById('uploadFile');
  const filePreview = document.getElementById('filePreview');

  // Object để lưu blob URL của file
  const fileStorage = {};


  fileUploader.addEventListener('change', (event) => {
    document.getElementById("contentBoxChange").style.display = 'none';
    document.getElementById("mainBoxFileList").style.display = 'block';
    const files = event.target.files;
    // <div className="file-box">File 1</div>
    const fileList = document.getElementById('file-list');
    // fileList.innerHTML = '';

    if (files.item != null) {
      for (let i = 0; i < files.length; i++) {
        // Tạo blob URL từ file
        const blobURL = URL.createObjectURL(files.item(i));
        fileStorage[files.item(i).name] = blobURL; // Lưu vào storage

        const fileBox = document.createElement('div');

        fileBox.classList.add('file-box');
        fileBox.textContent = files.item(i).name;

        filePreview.src = blobURL; // Hiển thị nội dung file (lấy file cuối upload)

        fileList.appendChild(fileBox);
      }
    }

  });

  const commandList = document.getElementById('currentSubmitForm');
  const recentCommandList = document.getElementById('recentSubmitForm');

  // localStorage.removeItem('currentSubmitForm'); // Xóa mục cụ thể
  // localStorage.removeItem('recentSubmitForm'); //

  const savedBoxes = JSON.parse(localStorage.getItem('currentSubmitForm')) || [];
  const recentSavedBoxes = JSON.parse(localStorage.getItem('recentSubmitForm')) || [];
  document.getElementById("commandInformationBox").classList.remove("commandInformationBoxW", "commandInformationBox");
  if (savedBoxes.length === 0) {
    document.getElementById("commandInformationBox").classList.add("commandInformationBoxW");
    document.getElementById("BlankCurrentCommand").style.display = 'block';
  } else {
    document.getElementById("commandInformationBox").classList.add("commandInformationBox");
    document.getElementById("BlankCurrentCommand").style.display = 'none';
  }

  // Chèn lại tất cả các thẻ CommandTagBox từ LocalStorage
  savedBoxes.forEach((boxHTML) => {
    commandList.innerHTML += boxHTML;
  });

  recentSavedBoxes.forEach((boxHTML) => {
    recentCommandList.innerHTML += boxHTML;
  });




  document.getElementById('printerSubmitForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Ngăn reload trang
    const formData = {};
    const elements = document.getElementById('printerSubmitForm').elements;

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const name = element.id || element.name // Dùng name hoặc id làm khóa
      const type = element.type;

      if (!name) continue; // Bỏ qua nếu không có name/id

      switch (type) {
        case 'radio':
          if (element.checked) {
            formData[name] = element.value;
          }
          break;
        case 'checkbox':
          console.log(name);
          if (!formData[name]) {
            formData[name] = [];
          }
          if (element.checked) {
            formData[name].push(element.value);
          }
          break;
        case 'file':
          formData[name] = Array.from(element.files).map(file => ({
            name: file.name,
            type: file.type,
            size: file.size,
            url: fileStorage[file.name] || URL.createObjectURL(file),
            // numPages

          }));

          break;
        default:
          formData[name] = element.value;
          break;
      }
    }

    // formData

    const picker = document.getElementById(formData['Printer']);


    const colorTag = picker.querySelector('.color');           // Thẻ con có class 'color'
    const nameTag = picker.querySelector('.name');             // Thẻ con có class 'name'
    const sideTag = picker.querySelector('.side');             // Thẻ con có class 'side'
    const printerLocationTag = picker.querySelector('.printerLocation'); // Thẻ con có class 'printerLocation'

    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleTimeString([], {hour: '2-digit'})}
                         ${currentDate.toLocaleDateString()}`;
    const colorClass = (colorTag.textContent === 'With Color') ? 'withColor' : 'withoutColor';
    const sideClass = (sideTag.textContent === '1 Sided') ? 'oneSided' : 'twoSided';


    for (const file of formData['uploadFile']) {
      const dashboardPaper = document.getElementById("paperID");
      let currentPaper = parseFloat(localStorage.getItem('dashboardPaper')) || parseFloat(dashboardPaper.textContent);
      const commandHTML = `
    <div class="CommandTagBox">
      <i class="fa-regular fa-file-lines" style="font-size: 16px;"></i>
      <div class="recentCommandTagBoxInfo noMargin">
        <span class="recentCommandTagBoxName smallSize">${file.name}</span>
        <br>
        <span class="recentCommandTagBoxDate smallSize">20 pages - ${formattedDate}</span>
      </div>
      <div class="recentCommandTagBoxInfo noMargin smallSize"> - </div>
      <div class="recentCommandTagBoxInfo noMargin smallSize">
        <span class="recentCommandTagBoxName smallSize">${formData["Printer"]}</span>
        <br>
        <span class="recentCommandTagBoxDate smallSize">${printerLocationTag.textContent}</span>
      </div>

      <div class="tagRoundBox ${colorClass} noMargin smallSize">${colorTag.textContent}</div>
      <div class="tagRoundBox ${sideClass} noMargin smallSize">${sideTag.textContent}</div>
    </div>
  `;
      console.log("dsaf");
      if(currentPaper < 20){
        alert("Not enough paper!!");
        break;
      }

      currentPaper -= 20; // so trang mac dinh
      dashboardPaper.textContent = currentPaper.toString();
      localStorage.setItem('dashboardPaper', currentPaper.toString());

      currentCommand += 1;
      dashboardCommand.textContent = currentCommand.toString();
      localStorage.setItem('totalCommand', currentCommand.toString());



      // Thêm HTML vào danh sách
      const commandList = document.getElementById('currentSubmitForm');
      commandList.innerHTML += commandHTML;

      // Lưu vào LocalStorage
      const savedBoxes = JSON.parse(localStorage.getItem('currentSubmitForm')) || [];
      savedBoxes.push(commandHTML);
      localStorage.setItem('currentSubmitForm', JSON.stringify(savedBoxes));



      const recentCommandHTML = `
    <div class="recentCommandTagBox">
        <div>
          <i class="fa-regular fa-file-lines" style="font-size: 20px;"></i>
        </div>
        <div class="recentCommandTagBoxInfo">
          <span class="recentCommandTagBoxName">${file.name}</span>
          <br>
          <span class="recentCommandTagBoxDate">20 pages - ${formattedDate}</span>
        </div>
        <div style="margin-left: 22px"> - </div>

        <div style="margin-left: 22px">
          <span class="recentCommandTagBoxName">${formData["Printer"]}</span>
          <br>
          <span class="recentCommandTagBoxDate">${printerLocationTag.textContent}</span>
        </div>

        <div class="tagRoundBox ${colorClass}">${colorTag.textContent}</div>
        <div class="tagRoundBox ${sideClass}">${sideTag.textContent}</div>

      </div>
  `;

      // Thêm HTML vào danh sách
      const recentCommandList = document.getElementById('recentSubmitForm');
      recentCommandList.innerHTML += recentCommandHTML;


      // Lưu vào LocalStorage
      const recentSavedBoxes = JSON.parse(localStorage.getItem('recentSubmitForm')) || [];
      recentSavedBoxes.push(recentCommandHTML);
      localStorage.setItem('recentSubmitForm', JSON.stringify(recentSavedBoxes));

    }



    event.target.reset();
    location.reload();
  });


});


function pickPrinter(printer) {
  document.getElementById("selected-printer").textContent = "Selected Printer: " + printer;
  // updateInfoPrinter(printer);
  const change = document.getElementById("Printer X");
  const picker = document.getElementById(printer);


  const colorTag = picker.querySelector('.color');           // Thẻ con có class 'color'
  const nameTag = picker.querySelector('.name');             // Thẻ con có class 'name'
  const sideTag = picker.querySelector('.side');             // Thẻ con có class 'side'
  const printerLocationTag = picker.querySelector('.printerLocation'); // Thẻ con có class 'printerLocation'

  const changeColorTag = change.querySelector('.color');           // Thẻ con có class 'color'
  const changeNameTag = change.querySelector('.name');             // Thẻ con có class 'name'
  const changeSideTag = change.querySelector('.side');             // Thẻ con có class 'side'
  const changePrinterLocationTag = change.querySelector('.printerLocation'); // Thẻ con có class 'printerLocation'

  changeColorTag.classList.remove("withoutColor", "withColor");
  changeSideTag.classList.remove("oneSided", "twoSided");

  if (colorTag.textContent === "Without Color") {
    changeColorTag.classList.add("withoutColor");
    changeColorTag.textContent = "Without Color";
  } else if (colorTag.textContent === "With Color") {
    changeColorTag.classList.add("withColor");
    changeColorTag.textContent = "With Color";
  }

  if (sideTag.textContent === "1 Sided") {
    changeSideTag.classList.add("oneSided");
    changeSideTag.textContent = "1 Sided";
  } else if (sideTag.textContent === "2 Sided") {
    changeSideTag.classList.add("twoSided");
    changeSideTag.textContent = "2 Sided";
  }

  changeNameTag.textContent = nameTag.textContent;
  changePrinterLocationTag.textContent = printerLocationTag.textContent;
  // update printer X
  exitPrinterContent();
  // document.getElementById("printerForm").submit();
}

function signOut(){
  localStorage.removeItem('currentSubmitForm');
}

// fileUploader.addEventListener('change', (event) => {
//   const files = event.target.files;
//
//
//   const feedback = document.getElementById('fileName');
//   if(files.item(0) != null){
//     feedback.textContent = files.at(0).value;
//   }
//   document.getElementsByClassName('file-box').item(0).style.display = 'none';
// });
// Function to read PDF file and return number of pages

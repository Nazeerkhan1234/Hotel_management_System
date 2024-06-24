// Home page related data
let userInfo;
let user;
let allPrintBtn = document.querySelectorAll(".print-btn");
let allTotalBtn = document.querySelectorAll(".total-btn");
let archPrintBtn = document.querySelector(".arch-print-btn");
let btnClose = document.querySelectorAll(".btn-close");
let logOutBtn = document.querySelector(".logout-btn");
let navBrand = document.querySelector(".navbar-brand");
let allTabBtn = document.querySelectorAll(".tab-btn");
let searchEle = document.querySelector(".search-input");
// booking related data
let allBookingData = [];
let bookingForm = document.querySelector(".booking-form");
let allBookingInput = bookingForm.querySelectorAll("input");
let bookingTextarea = bookingForm.querySelector("textarea");
let bListTBody = document.querySelector(".booking-list");
let regBbtn = document.querySelector(".regB-btn");
let bookingTab = document.querySelector("#booking");
let showBRoomEle = document.querySelector(".show-booking-room");
// In House related data
let allInhouseData = [];
let inHouseForm = document.querySelector(".inhouse-form");
let allinHInput = inHouseForm.querySelectorAll("input");
let inhouseTextarea = inHouseForm.querySelector("textarea");
let inHousebtn = document.querySelector(".inhouse-reg-btn");
let inHListTBody = document.querySelector(".inhouse-list");
let showHRoomEle = document.querySelector(".show-inhouse-room");
// archive related data
let allArchData = [];
let archListTBody = document.querySelector(".archive-List");
// cashier related data
let allCashData = [];
let cashierForm = document.querySelector(".cashier-form");
let allCInput = cashierForm.querySelectorAll("input");
let cashierBtn = document.querySelector(".cashier-tab");
let cashierTabPan = document.querySelector(".cashier-tab-pan");
let cashierTab = document.querySelector("#cashier");
let cashBtn = document.querySelector(".cash-btn");
let cashTbody = document.querySelector(".cashier-list");
let closeCashierBtn = document.querySelector(".close-cashier-btn");
let cashTotal = document.querySelector(".total");
// Archive Cashier
let allCashArchData = [];
let cashierArchTbody = document.querySelector(".cashier-arch-list");
let archTotal = document.querySelector(".cashier-arch-total");

// check user is login or not
if (sessionStorage.getItem("__auth__") == null) {
  window.location = "../index.html";
}
userInfo = JSON.parse(sessionStorage.getItem("__auth__"));
navBrand.innerHTML = userInfo.hotelname;
user = userInfo.email.split("@")[0];
// print
for (let btn of allPrintBtn) {
  btn.onclick = () => {
    window.print();
  };
}
archPrintBtn.onclick = () => {
  cashierTabPan.classList.add("d-none");
  window.print();
};
btnClose[3].onclick = () => {
  cashierTabPan.classList.remove("d-none");
};
// getting data from storage
const fetchdata = (key) => {
  if (localStorage.getItem(key) != null) {
    const data = JSON.parse(localStorage.getItem(key));
    return data;
  } else {
    return [];
  }
};
allBookingData = fetchdata(user + "_allBdata");
allInhouseData = fetchdata(user + "_allHdata");
allArchData = fetchdata(user + "_allArchData");
allCashData = fetchdata(user + "_allCdata");
allCashArchData = fetchdata(user + "_allCashArchData");
//formate date function
const formatDate = (data, isTime) => {
  const date = new Date(data);
  let yy = date.getFullYear();
  let mm = date.getMonth() + 1;
  mm = mm < 10 ? "0" + mm : mm;
  let dd = date.getDate();
  dd = dd < 10 ? "0" + dd : dd;
  let time = date.toLocaleTimeString();
  return `${dd}-${mm}-${yy} ${isTime ? time : ""}`;
};
// Registration
const registrationFunc = (arr, inputs, textarea = null, key) => {
  let data = {
    notice: textarea && textarea.value,
    inHouse: false,
    createdAt: new Date(),
  };
  for (let ele of inputs) {
    let key = ele.name;
    data[key] = ele.value;
  }
  arr.unshift(data);
  localStorage.setItem(key, JSON.stringify(arr));
  swal("Good Job !", "Booking Success", "success");
};
// show data
const showData = (ele, arr, key) => {
  let tmp = key.split("_")[1];
  ele.innerHTML = "";
  arr.forEach((item, idx) => {
    ele.innerHTML += `<tr>
                               <td class="no-print text-nowrap">${idx + 1}</td>
                               <td class="text-nowrap">${item.location}</td>
                               <td class="text-nowrap">${item.roomNo}</td>
                               <td class="text-nowrap">${item.fullname}</td>
                               <td class="text-nowrap">${formatDate(
                                 item.checkIndate
                               )}</td>
                               <td class="text-nowrap">${formatDate(
                                 item.checkOutDate
                               )}</td>
                               <td class="text-nowrap">${item.totalPeople}</td>
                               <td class="text-nowrap">${item.mobile}</td>
                               <td class="text-nowrap">${item.price}</td>
                               <td class="text-nowrap">${item.notice}</td>
                               <td class="text-nowrap no-print">${formatDate(
                                 item.createdAt,
                                 true
                               )}</td>
                               <td class="text-nowrap">
                                  <button class="no-print ${
                                    tmp == "allArchData" ? "d-none" : ""
                                  } edit-btn btn px-2 p-1 me-1 btn-primary">
                                   <i class="fa fa-edit"></i></button
                                  ><button class="no-print checkin-btn btn px-2 p-1 me-1 btn-info text-white">
                                    <i class="fa fa-check"></i></button
                                  ><button class="del-btn btn px-2 p-1 btn-danger no-print">
                                    <i class="fa fa-trash"></i>
                                  </button>
                                </td>
                             </tr>`;
  });
  delFunc(ele, arr, key);
  editFunc(ele, arr, key);
  checkInCheckout(ele, arr, key);
};
//logout
logOutBtn.onclick = () => {
  logOutBtn.innerHTML = "Please wait...";
  setTimeout(() => {
    logOutBtn.innerHTML = "Logout";
    sessionStorage.removeItem("__auth__");
    window.location = "../index.html";
  }, 2000);
};
//Booking Registration
bookingForm.onsubmit = (e) => {
  e.preventDefault();
  registrationFunc(
    allBookingData,
    allBookingInput,
    bookingTextarea,
    user + "_allBdata"
  );
  bookingForm.reset("");
  btnClose[0].click();
  showData(bListTBody, allBookingData, user + "_allBdata");
  showTotal();
  showBookingRooms();
};
// In House Registration
inHouseForm.onsubmit = (e) => {
  e.preventDefault();
  registrationFunc(
    allInhouseData,
    allinHInput,
    inhouseTextarea,
    user + "_allHdata"
  );
  inHouseForm.reset("");
  btnClose[1].click();
  showData(inHListTBody, allInhouseData, user + "_allHdata");
  showTotal();
  showInhouseRooms();
};
//Cashier Registration
cashierForm.onsubmit = (e) => {
  e.preventDefault();
  registrationFunc(allCashData, allCInput, null, user + "_allCdata");
  showCashierFn();
  cashierForm.reset("");
  btnClose[2].click();
};
// Deletion
const delFunc = (ele, arr, key) => {
  let alldelBtn = ele.querySelectorAll(".del-btn");
  alldelBtn.forEach((btn, idx) => {
    btn.onclick = () => {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary data!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          arr.splice(idx, 1);
          localStorage.setItem(key, JSON.stringify(arr));
          showData(ele, arr, key);
          swal("Poof! Your Data has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your Data is safe!");
        }
      });
    };
  });
};
// Updation
const editFunc = (ele, arr, key) => {
  let alleditBtn = ele.querySelectorAll(".edit-btn");
  alleditBtn.forEach((btn, idx) => {
    btn.onclick = () => {
      let tmp = key.split("_")[1];
      tmp == "allBdata" ? regBbtn.click() : inHousebtn.click();
      let allBtn =
        tmp == "allBdata"
          ? bookingForm.querySelectorAll("button")
          : inHouseForm.querySelectorAll("button");
      let allInput =
        tmp == "allBdata"
          ? bookingForm.querySelectorAll("input")
          : inHouseForm.querySelectorAll("input");
      let textarea =
        tmp == "allBdata"
          ? bookingForm.querySelector("textarea")
          : inHouseForm.querySelector("textarea");
      allBtn[0].classList.add("d-none");
      allBtn[1].classList.remove("d-none");
      let obj = arr[idx];
      allInput[0].value = obj.fullname;
      allInput[1].value = obj.location;
      allInput[2].value = obj.roomNo;
      allInput[3].value = obj.totalPeople;
      allInput[4].value = obj.checkIndate;
      allInput[5].value = obj.checkOutDate;
      allInput[6].value = obj.price;
      allInput[7].value = obj.mobile;
      textarea.value = obj.notice;
      allBtn[1].onclick = () => {
        let formData = {
          notice: textarea.value,
          createdAt: new Date(),
        };
        for (let ele of allInput) {
          let key = ele.name;
          formData[key] = ele.value;
        }
        arr[idx] = formData;
        localStorage.setItem(key, JSON.stringify(arr));
        allBtn[0].classList.remove("d-none");
        allBtn[1].classList.add("d-none");
        tmp == "allBdata" ? btnClose[0].click() : btnClose[1].click();
        swal("Data Updated Successfully");
        showData(ele, arr, key);
      };
    };
  });
};
// checkin and checkOut
const checkInCheckout = (ele, arr, key) => {
  let allcheckBtn = ele.querySelectorAll(".checkin-btn");
  allcheckBtn.forEach((btn, idx) => {
    btn.onclick = () => {
      let tmp = key.split("_")[1];
      let data = arr[idx];
      arr.splice(idx, 1);
      localStorage.setItem(key, JSON.stringify(arr));
      if (tmp == "allBdata") {
        allInhouseData.unshift(data);
        localStorage.setItem(
          user + "_allHdata",
          JSON.stringify(allInhouseData)
        );
        swal("Data CheckIn Successfully");
        showData(ele, arr, key);
        showBookingRooms();
        showInhouseRooms();
        showTotal();
      } else if (tmp == "allArchData") {
        allBookingData.unshift(data);
        localStorage.setItem(user + "_allBata", JSON.stringify(allBookingData));
        swal("Data Moving in Booking Successfully");
        showData(ele, arr, key);
        showBookingRooms();
        showInhouseRooms();
        showTotal();
      } else {
        allArchData.unshift(data);
        localStorage.setItem(
          user + "_allArchData",
          JSON.stringify(allArchData)
        );
        swal("Data Checkout Successfully");
        showData(ele, arr, key);
        showInhouseRooms();
        showTotal();
      }
    };
  });
};
// Referesh UI Data
for (let btn of allTabBtn) {
  btn.onclick = () => {
    showData(inHListTBody, allInhouseData, user + "_allHdata");
    showData(bListTBody, allBookingData, user + "_allBdata");
    showData(archListTBody, allArchData, user + "_allArchData");
  };
}
// searching
const searchFn = () => {
  let val = searchEle.value.toLowerCase();
  let tblEle = document.querySelector(".tab-content .search-pan.active");
  let tr = tblEle.querySelectorAll("tbody tr");
  for (let el of tr) {
    let srNo = el.querySelectorAll("td")[0].innerText;
    let location = el.querySelectorAll("td")[1].innerText.toLowerCase();
    let roomNo = el.querySelectorAll("td")[2].innerText.toLowerCase();
    let fullname = el.querySelectorAll("td")[3].innerText.toLowerCase();
    let mobile = el.querySelectorAll("td")[7].innerText.toLowerCase();
    let price = el.querySelectorAll("td")[8].innerText.toLowerCase();
    if (srNo.indexOf(val) != -1) {
      el.classList.remove("d-none");
    } else if (location.indexOf(val) != -1) {
      el.classList.remove("d-none");
    } else if (roomNo.indexOf(val) != -1) {
      el.classList.remove("d-none");
    } else if (fullname.indexOf(val) != -1) {
      el.classList.remove("d-none");
    } else if (mobile.indexOf(val) != -1) {
      el.classList.remove("d-none");
    } else if (price.indexOf(val) != -1) {
      el.classList.remove("d-none");
    } else {
      el.classList.add("d-none");
    }
  }
};
searchEle.oninput = () => {
  searchFn();
};

showData(inHListTBody, allInhouseData, user + "_allHdata");
showData(bListTBody, allBookingData, user + "_allBdata");
showData(archListTBody, allArchData, user + "_allArchData");

//close Cashier
const showCashierFn = () => {
  let totalCash = 0;
  cashTbody.innerHTML = " ";
  allCashData.forEach((item, idx) => {
    totalCash += +item.amount;
    cashTbody.innerHTML += `
    <tr>
                      <td>${idx + 1}</td>
                      <td>${item.roomNo}</td>
                      <td>${item.cashierName}</td>
                      <td>${formatDate(item.createdAt, true)}</td>
                      <td>${item.amount}</td>
                    </tr>
    `;
  });
  cashTotal.innerHTML = "<i class='fa fa-rupee'></i>   " + totalCash;
};
showCashierFn();
cashBtn.onclick = () => {
  allCInput[2].value = sessionStorage.getItem("c_name");
};
cashierBtn.onclick = () => {
  if (sessionStorage.getItem("c_name") == null) {
    let name = window.prompt("Enter your Name");
    if (name) {
      sessionStorage.setItem("c_name", name);
    } else {
      allTabBtn[0].classList.add("active");
      bookingTab.classList.add("active");
      cashierTab.classList.remove("active");
      cashierBtn.classList.remove("active");
    }
  } else {
    allCInput[2].value = sessionStorage.getItem("c_name");
  }
};
// close cashier btn
closeCashierBtn.onclick = () => {
  if (allCashData.length > 0) {
    let data = {
      cashierName: sessionStorage.getItem("c_name"),
      total: cashTotal.innerText,
      createdAt: new Date(),
    };
    allCashArchData.push(data);
    allCashData = [];
    localStorage.removeItem(user + "_allCdata");
    localStorage.setItem(
      user + "_allCashArchData",
      JSON.stringify(allCashArchData)
    );
    sessionStorage.removeItem("c_name");
    showCashierFn();
  } else {
    swal("Warning", "there is no cash to close", "warning");
  }
};
// Archive Cashier
const showArchiveCashierFn = () => {
  let totalCash = 0;
  cashierArchTbody.innerHTML = " ";
  allCashArchData.forEach((item, idx) => {
    totalCash += +item.total;
    cashierArchTbody.innerHTML += `
    <tr>
                      <td>${idx + 1}</td>
                      <td>${item.cashierName}</td>
                      <td>${formatDate(item.createdAt, true)}</td>
                      <td>${item.total}</td>
                    </tr>
    `;
  });
  archTotal.innerHTML = "<i class='fa fa-rupee'></i> " + totalCash;
};
showArchiveCashierFn();
//show Booking Rooms
const showBookingRooms = () => {
  showBRoomEle.innerHTML = "";
  allBookingData.forEach((item, idx) => {
    showBRoomEle.innerHTML += `<div class="card text-center px-0 col-md-2">
                  <div class="bg-danger text-white fw-bold card-header">
                    ${item.roomNo}
                  </div>
                  <div class="card-body bg-success text-white fw-bold">
                    <p>${formatDate(item.checkIndate)}</p>
                    <p>To</p>
                    <p>${formatDate(item.checkOutDate)}</p>
                  </div>
                </div>`;
  });
};
showBookingRooms();
// show Inhouse Rooms
const showInhouseRooms = () => {
  showHRoomEle.innerHTML = "";
  allInhouseData.forEach((item, idx) => {
    showHRoomEle.innerHTML += `<div class="card text-center px-0 col-md-2">
                  <div class="bg-danger text-white fw-bold card-header">
                    ${item.roomNo}
                  </div>
                  <div class="card-body">
                    <img src="${
                      item.inHouse ? "/img/dummy.png" : "/img/lock.jpeg"
                    }" class="w-100" height="150px">
                  </div>
                  <div class="card-footer">
                    <button class="in-btn action-btn btn text-white">
                      In
                    </button>
                    <button class="out-btn action-btn btn text-white">
                      Out
                    </button>
                  </div>
                </div>`;
  });
  // In coding
  let allInBtn = showHRoomEle.querySelectorAll(".in-btn");
  allInBtn.forEach((btn, idx) => {
    btn.onclick = () => {
      let data = allInhouseData[idx];
      data.inHouse = true;
      allInhouseData[idx] = data;
      localStorage.setItem(user + "_allHdata", JSON.stringify(allInhouseData));
      showInhouseRooms();
    };
  });
  // Out coding
  let allOutBtn = showHRoomEle.querySelectorAll(".out-btn");
  allOutBtn.forEach((btn, idx) => {
    btn.onclick = () => {
      let data = allInhouseData[idx];
      data.inHouse = false;
      allInhouseData[idx] = data;
      localStorage.setItem(user + "_allHdata", JSON.stringify(allInhouseData));
      showInhouseRooms();
    };
  });
};
showInhouseRooms();
// show total length
const showTotal = () => {
  allTotalBtn[0].innerText = "Total Booking = " + allBookingData.length;
  allTotalBtn[1].innerText = "Total Inhouse = " + allInhouseData.length;
  allTotalBtn[2].innerText = "Total Archive = " + allArchData.length;
};
showTotal();
// check Hotel Rooms
const chehkRooms = (ele) => {
  if (Number(userInfo.totalRoom) < Number(ele.value)) {
    swal(
      "warning",
      `Total ${userInfo.totalRoom} room is available in the Hotel`,
      "warning"
    );
  }
};
allBookingInput[2].oninput = (e) => {
  chehkRooms(e.target);
};
allinHInput[2].oninput = (e) => {
  chehkRooms(e.target);
};

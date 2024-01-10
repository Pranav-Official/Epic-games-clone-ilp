document.addEventListener("DOMContentLoaded", function () {
  // Sample data
  var tableData = [
    { product: "3 & OiSTER", countries: "DK" },
    { product: "3Pay", countries: "GB, IE" },
    { product: "ATM/Bank Transfer", countries: "ID" },
    { product: "Alipay HK", countries: "HK" },
    {
      product: "Amazon Pay",
      countries: "AT, BE, CY, DE, ES, FR, GB, IE, IT, LU, NL, PT",
    },
    { product: "Banco de Credito *", countries: "PE" },
    { product: "Bancontact Card", countries: "BE" },
    { product: "Blik", countries: "PL" },
    { product: "Boleto Flash", countries: "BR" },
    { product: "Ceska sporitelna", countries: "CZ" },
    { product: "Citadele bank", countries: "LV" },
    {
      product: "Credit Card",
      countries:
        "AD, AE, AF, AG, AI, AL, AM, AN, AO, AQ, AR, AT, AU, AW, AX, AZ, BA, BB, BD, BE, BF, BG, BH, BI, BJ, BL, BM, BN, BO, BQ, BR, BS, BT, BV, BW, BY, BZ, CA, CC, CD, CF, CG, CH, CI, CK, CL, CM, CO, CR, CV, CW, CX, CY, CZ, DE, DJ, DK, DM, DO, DZ, EC, EE, EG, EH, ER, ES, ET, FI, FJ, FK, FM, FO, FR, GA, GB, GD, GE, GF, GG, GH, GI, GL, GM, GN, GP, GQ, GR, GS, GT, GU, GW, GY, HK, HM, HN, HR, HT, HU, IE, IL, IM, IN, IO, IQ, IS, IT, JE, JM, JO, JP, KE, KG, KH, KI, KM, KN, KW, KY, KZ, LA, LB, LC, LI, LK, LR, LS, LT, LU, LV, LY, MA, MC, MD, ME, MF, MG, MH, MK, ML, MM, MN, MO, MP, MQ, MR, MS, MT, MU, MV, MW, MX, MY, MZ, NA, NC, NE, NF, NG, NI, NL, NO, NP, NR, NU, NZ, OM, PA, PE, PF, PG, PH, PK, PL, PM, PN, PR, PS, PT, PW, PY, QA, RE, RO, RS, RU, RW, SA, SB, SC, SD, SE, SG, SH, SI, SJ, SK, SL, SM, SN, SO, SR, SS, ST, SV, SX, SZ, TC, TD, TF, TG, TH, TJ, TK, TL, TM, TN, TO, TR, TT, TV, TW, TZ, UA, UG, UM, US, UY, UZ, VA, VC, VE, VG, VI, VN, VU, WF, WS, XK, YE, YT, ZA, ZM, ZW",
    },
    { product: "DANA", countries: "ID" },
    { product: "DOKU Wallet", countries: "ID" },
    { product: "ERA", countries: "CZ" },
    { product: "Elisa", countries: "ID" },
    { product: "ATM/Bank Transfer", countries: "EE, FI" },
    { product: "FIO banka", countries: "CZ" },
    { product: "GCash", countries: "PH" },
    { product: "Giropay", countries: "DE" },
    { product: "Havale/ATM/PTT", countries: "TR" },
    { product: "Ininal *", countries: "TR" },
    { product: "International Credit Card", countries: "KR" },
    { product: "Is Bankasi", countries: "TR" },
    { product: "KakaoPay", countries: "KR" },
    { product: "Komercni Banka", countries: "KR" },
    { product: "Korean Credit Card", countries: "KR" },
    { product: "Malaysia E-Banking", countries: "MY" },
    { product: "Maybank", countries: "MY" },
    { product: "Mobile payment *", countries: "RU" },
    { product: "Movistar", countries: "ES" },
    { product: "MultiBanco", countries: "PT" },
    { product: "Neosurf *", countries: "FR" },
    { product: "Nordea Bank", countries: "SE" },
    { product: "O2 Charge to Mobile", countries: "GB" },
    { product: "OVO", countries: "ID" },
    { product: "OXXO *", countries: "MX" },
    { product: "Online Banking PL", countries: "PL" },
    { product: "PAYCO", countries: "KR" },
    { product: "PIX", countries: "KR" },
    {
      product: "PayPal",
      countries:
        "AD, AE, AF, AG, AI, AL, AM, AN, AO, AQ, AR, AS, AT, AU, AW, AX, AZ, BA, BB, BD, BE, BF, BG, BH, BI, BJ, BL, BM, BN, BO, BQ, BR, BS, BT, BV, BW, BZ, CA, CC, CD, CF, CG, CH, CI, CK, CL, CM, CO, CR, CV, CW, CX, CY, CZ, DE, DJ, DK, DM, DO, DZ, EC, EE, EG, EH, ER, ES, ET, FI, FJ, FK, FM, FO, FR, GA, GB, GD, GE, GF, GG, GH, GI, GL, GM, GN, GP, GQ, GR, GS, GT, GU, GW, GY, HK, HM, HN, HR, HT, HU, ID, IE, IL, IM, IN, IO, IQ, IS, IT, JE, JM, JO, JP, KE, KG, KH, KI, KM, KN, KW, KY, KZ, LA, LB, LC, LI, LK, LR, LS, LT, LU, LV, LY, MA, MC, MD, ME, MF, MG, MH, MK, ML, MM, MN, MO, MP, MQ, MR, MS, MT, MU, MV, MW, MX, MY, MZ, NA, NC, NE, NF, NG, NI, NL, NO, NP, NR, NU, NZ, OM, PA, PE, PF, PG, PH, PK, PL, PM, PN, PR, PS, PT, PW, PY, QA, RE, RO, RS, RW, SA, SB, SC, SD, SE, SG, SH, SI, SJ, SK, SL, SM, SN, SO, SR, SS, ST, SV, SX, SZ, TC, TD, TF, TG, TH, TJ, TK, TL, TM, TN, TO, TT, TV, TW, TZ, UG, UM, US, UY, UZ, VA, VC, VE, VG, VI, VN, VU, WF, WS, XK, YE, YT, ZA, ZM, ZW",
    },
    { product: "Payconiq By Bancontact", countries: "BE" },
    {
      product: "Paysafecard *",
      countries:
        "AT, AU, BE, CY, CZ, DE, DK, ES, FI, FR, GE, IE, IT, LT, LU, NL, NO, PL, PT, SE, SI, SK",
    },
    { product: "Play", countries: "PL" },
    { product: "QIWI", countries: "BY, RU" },
    {
      product: "Razer Gold Wallet *",
      countries: "CO, ID, MX, MY, PH, SG, TH, TR",
    },
    { product: "SEB", countries: "EE, LT" },
    { product: "Skrill Digital Wallet", countries: "DE, ES, FR, IE" },
    { product: "Sofort", countries: "AT, CH, DE" },
    { product: "Swedbank", countries: "EE, LT, LV, SE" },
    { product: "Swisscom", countries: "CH" },
    { product: "Tatra Banka", countries: "SK" },
    { product: "Tele2", countries: "SE" },
    { product: "Telia", countries: "FI" },
    { product: "Toss", countries: "KR" },
    { product: "Tre Faktura", countries: "SE" },
    { product: "Trustly", countries: "DK, FI, SE" },
    { product: "VUB Banka", countries: "SK" },
    { product: "WINDTRE", countries: "IT" },
    { product: "Ziraat Bankasi", countries: "TR" },
    { product: "iDEAL", countries: "NL" },
    { product: "微信支付", countries: "CN" },
    { product: "支付宝", countries: "CN, HK" },
  ];

  // Function to generate table rows
  function generateTable(data) {
    var tableContainer = document.getElementById("table-container");

    var table = document.createElement("table");
    table.classList.add("pw-faq-table", "pw-faq-table--en_US");

    var tbody = document.createElement("tbody");

    // Header row
    var headerRow = document.createElement("tr");
    var thMethod = document.createElement("th");
    thMethod.classList.add("pw-faq-table__pm");
    thMethod.innerHTML = "<p>Payment Method</p>";
    headerRow.appendChild(thMethod);

    var thCountries = document.createElement("th");
    thCountries.classList.add("pw-faq-table__countries");
    thCountries.innerHTML = "<p>Countries and Regions Supported</p>";
    headerRow.appendChild(thCountries);

    tbody.appendChild(headerRow);

    // Additional information row
    var additionalInfoRow = document.createElement("tr");
    var tdAdditionalInfo = document.createElement("td");
    tdAdditionalInfo.setAttribute("colspan", "2");
    tdAdditionalInfo.innerHTML =
      "<p><i>(*) with additional payment processing fees</i></p>";
    additionalInfoRow.appendChild(tdAdditionalInfo);

    tbody.appendChild(additionalInfoRow);

    // Data rows
    data.forEach(function (item) {
      var dataRow = document.createElement("tr");

      var tdMethod = document.createElement("td");
      tdMethod.classList.add("pw-faq-table__pm");
      tdMethod.innerHTML = "<p>" + item.method + "</p>";
      dataRow.appendChild(tdMethod);

      var tdCountries = document.createElement("td");
      tdCountries.classList.add("pw-faq-table__countries");
      tdCountries.innerHTML = "<p>" + item.countries + "</p>";
      dataRow.appendChild(tdCountries);

      tbody.appendChild(dataRow);
    });

    table.appendChild(tbody);
    tableContainer.appendChild(table);
  }

  // Call the function with your data
  generateTable(tableData);
});

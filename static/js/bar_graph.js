// // IF geting data from local file ***MUST USE LIVE SERVER***
const url = "api/weather";

// // /////  TESTING DATA   /////////////////////////////////////////

// d3.json(url).then((data) => {
//   console.log(`TEST this is from js`);
//   console.log(`TEST This is state ID: ${data[0].State}`)
//   console.log(`TEST This is state NAME: ${data[0].State_1}`)
//   console.log(`TEST This is YEAR: ${data[0].Year}`)
//   console.log(`TEST This is Jan Temp: ${data[0].Jan}`)
// })

// // ////////////////////////////////////////////////////////
// // ----------------INIT and GRAPHS ------------------------
// FOR REFERENCE --- > url = API endpoint

function init_plot_graphs(){
  d3.json(url).then(function(data) {
 
    // sample_values =  data.samples[0].sample_values.slice(0,10).reverse();
    // console.log(`OTU Value ${sample_values}`);
    // otu_ids =  data.samples[0].otu_ids.slice(0,10);
    // console.log (`OTU ID ${otu_ids}`); 
    // otu_labels = data.samples[0].otu_labels.slice(0,10);
    // console.log(`OTU label ${otu_labels}`);
    // yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();
  // // -----BAR GRAPH PLOT--------------------
  //  REF -- > https://plotly.com/javascript/bar-charts/ < -- REF
      console.log(`LINE35: Start plot bar graph`);

      state1 = String(data[0].slice(0,1));
      state2 = String(data[10].slice(0,1));
      year = String(data[0].slice(0,1));

      console.log(`This is state1: ${state1}`);
      console.log(state2);
      
      months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      state1_temp = (data[0].slice(2,14));
      state2_temp = (data[10].slice(2,14));

      console.log(`This is State1_temp ${state1_temp}`);

      let trace1 = {
        x: months,
        y: state1_temp,
        name: state1,
        type: "bar"
        };

        //     //   // Create our second trace
      let trace2 = {
        x: months,
        y: state2_temp,
        name: state2,
        type: "bar"
      };

      var layout = {
        height: 600,
        width: 800,
        barmode: 'group'
      };
            
      // The data array consists of both traces
      let bar_data = [trace1, trace2];

      Plotly.newPlot("bar", bar_data, layout);
      console.log(`LINE71: End plot bar graph`);
    });

    dropdown_populate()
}

// ////////////////////////////////////////////////////////
// // ---------------------Drop Down LISTENER ------------------
d3.select("#selDataset").on("change", dropdown_populate);

// This function is called when a dropdown menu item is selected
function dropdown_populate() {
  console.log(`LINE79: Start dropdown_populate()`);  
  // Use D3 to select the dropdown menu
    var dropdownMenu0 = d3.select("#selDataset0");
    var dropdownMenu1 = d3.select("#selDataset1");
    var dropdownMenu2 = d3.select("#selDataset2");
    // Assign the value of the dropdown menu option to a variable
    console.log('LINE86 dropdown_populate function running');

// Fetch the JSON data and console log it
    d3.json(url).then((data) => {
      // console.log(`LINE90 Data Length: ${data.length}`);
      
      var list_statename = [];
      for (var i = 0; i < data.length; i += 10) {  
        // console.log(data[i].State_1)
        list_statename.push(data[i].slice(0,1))
        dropdownMenu0.append("option").text(data[i].slice(0,1)).property("value")
        dropdownMenu1.append("option").text(data[i].slice(0,1)).property("value")
      }

      var list_years = [];
      for (var i = 0; i < 10; i++) {  
        // console.log(data[i].Year)
        list_years.push(data[i].slice(1,2))
        dropdownMenu2.append("option").text(data[i].slice(1,2)).property("value")
      }

      console.log(`Statename: ${list_statename}`);
      console.log(`Years: ${list_years}`);

      console.log(`LINE109: END dropdown_populate()`);  

    // create variable that calls data AFTER fetch data
    // var dataset = dropdownMenu.property("value");
    // demo_info(dataset);
    // updatechart(dataset);
    // console.log(`This is dataset: ${dataset}`);
  });
}

  init_plot_graphs()
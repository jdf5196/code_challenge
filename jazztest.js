// Create an object to store the feature group dataset
// and methods to test the total chance percentage
let document;
let groups = new (function(){
    // Define the feature group dataset
    this.groups = [
        {
            name: 'Group 1',
            features: ['A', 'B'],
            chance: 10
        },
        {
            name: 'Group 2',
            features: ['B', 'C'],
            chance: 20
        },
        {
            name: 'Group 3',
            features: ['C'],
            chance: 20
        },
        {
            name: 'Group 4',
            features: ['A', 'C', 'D'],
            chance: 50
        }
    ];

    // Define assignment array
    // Each feature group will be pushed to the assign array a number of times equal to their chance percentage
    this.assign = [];

    // Determine the total chance percentage
    this.chanceTotal = ((obj)=>{
        let total = 0;
        obj.groups.map((g)=>{
            total += g.chance;
        });

        //Warn user if the percentages do not add up to 100
        if(total !== 100){
            console.warn(`Chance percentages add up to ${total}. They must add up to 100.`);
            if(document){
                document.write(`Chance percentages add up to ${total}. They must add up to 100.<br>`);
            };
        }else{
            console.log('Chance percentages add up to 100.');
            if(document){
                document.write('Chance percentages add up to 100.<br><br>'); 
            };
            // Build assign array if percentages add up to 100
            obj.groups.map((g)=>{
                for(let i = 1; i <= g.chance; i++){
                    obj.assign.push(g);
                }
            });
        }
        return total
    })(this);
})();

// Defin customer dataset

let customers = [
    {
        name: 'Widget Co',
        features: [],
        group: ''
    },
    {
        name: 'Synergy Inc',
        features: [],
        group: ''
    },
    {
        name: 'Elevation Executives',
        features: [],
        group: ''
    },
    {
        name: 'Momentum Partners',
        features: [],
        group: ''
    }
];

// Assign a feature group to each customer
const assign = ((obj, arr)=>{
    if(obj.chanceTotal !== 100){
        // Warn user that groups cannot be assigned if the chance percentages do not add up to 100
        console.warn('Chance percentages must equal 100 to assign groups to customers.');
        if(document){
            document.write('Chance percentages must equal 100 to assign groups to customers.<br><br>');
        };
    }else{
        // Assign if the chance percentages add up to 100
        console.log('Assigning groups to customers...');
        if(document){
            document.write('Assigning groups to customers...<br><br>');
        };
        for(let i in arr){
            if(!arr[i].group){
                // Get a random number between 1 and 100
                let num = Math.floor((Math.random() * 100) + 1);

                // Assign the group at the index of the assign array equal to the random number minus 1
                arr[i].group = obj.assign[num - 1].name;
                arr[i].features = obj.assign[num - 1].features;
                console.log(`${arr[i].name} has been assigned to ${arr[i].group}`);
                if(document){
                    document.write(`${arr[i].name} has been assigned to ${arr[i].group}<br>`);
                };
            }else{
                console.log(`${arr[i].name} already has a group assigned.`);
                if(document){
                    document.write(`${arr[i].name} already has a group assigned.<br>`);
                };
            }
        };
    }
})(groups, customers);

// A function to check if a customer has access to a specific feature. 
// Takes 2 arguments, the customer and the feature.
const checkFeature = (customer, feature)=>{
    // Find the customer by name Return an error if it is not found
    let c = customers.filter((obj)=>{
        return obj.name === customer
    });
    // Return an error if the searched for customer is not found
    if(c[0] == undefined){
        return 'Cannot find customer.'
    // If customer is found, search for the feature by index and return a boolean
    }else if(c[0] != undefined){
        if(c[0].features.length === 0){
            return 'Customer does not have any assigned features.'
        }
        let f = feature.slice(feature.length - 1, feature.length);
        return c[0].features.indexOf(f) > -1
    }
}
let test = checkFeature('Widget Co', 'Feature A');
console.log('Testing if Widget Co has access to Feature A.');
console.log(test);
if(document){
    document.write('<br>Testing if Widget Co has access to Feature A:<br>');
    document.write(test);
};
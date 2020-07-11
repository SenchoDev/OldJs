//---------------Use meaningful and pronounceable variable names
const currentDate = moment().format("YYYY/MM/DD");

//---------------Use the same vocabulary for the same type of variable
//do
getUser(); 
//dont do
getUserInfo();
getClientData();
getCustomerRecord();

//---------------Use searchable names

setTimeout(blastOff, MILLISECONDS_IN_A_DAY);
//don't do
// What the heck is 86400000 for?
setTimeout(blastOff, 86400000);

//do
const MILLISECONDS_IN_A_DAY = 86_400_000;


//---------------Use explanatory variables

//dont do
const address = "One Infinite Loop, Cupertino 95014";
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
saveCityZipCode(
  address.match(cityZipCodeRegex)[1],
  address.match(cityZipCodeRegex)[2]
)
// do 
const address = "One Infinite Loop, Cupertino 95014";
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
const [_, city, zipCode] = address.match(cityZipCodeRegex) || [];
saveCityZipCode(city, zipCode);

//---------------Avoid Mental Mapping

//dont do 
const locations = ["Austin", "New York", "San Francisco"];
locations.forEach(l => {
  doStuff();
  doSomeOtherStuff();
  // ...
  // ...
  // ...
  // Wait, what is `l` for again?
  dispatch(l);
});

// do 
const locations = ["Austin", "New York", "San Francisco"];
locations.forEach(location => {
  doStuff();
  doSomeOtherStuff();
  // ...
  // ...
  // ...
  dispatch(location);
});

//---------------Don't add unneeded context

//dont do
const Car = {
  carMake: "Honda",
  carModel: "Accord",
  carColor: "Blue"
};

function paintCar(car) {
  car.carColor = "Red";
}

//do
const Car = {
  make: "Honda",
  model: "Accord",
  color: "Blue"
};

function paintCar(car) {
  car.color = "Red";
}

//---------------Use default arguments instead of short circuiting or conditionals

//dont do
function createMicrobrewery(name) {
  const breweryName = name || "Hipster Brew Co.";
  // ...
}
// do
function createMicrobrewery(name = "Hipster Brew Co.") {
  // ...
}

//---------------Function arguments (2 or fewer ideally)

//dont do
function createMenu(title, body, buttonText, cancellable) {
  // ...
}

createMenu("Foo", "Bar", "Baz", true);

// do 

function createMenu({ title, body, buttonText, cancellable }) {
  // ...
}

createMenu({
  title: "Foo",
  body: "Bar",
  buttonText: "Baz",
  cancellable: true
});
//---------------Functions should do one thing

//dont do
function emailClients(clients) {
  clients.forEach(client => {
    const clientRecord = database.lookup(client);
    if (clientRecord.isActive()) {
      email(client);
    }
  });
}

//do function emailActiveClients(clients) {
  function emailActiveClients(clients) {
    clients.filter(isActiveClient).forEach(email);
  }
  
  function isActiveClient(client) {
    const clientRecord = database.lookup(client);
    return clientRecord.isActive();
  }

//---------------Function names should say what they do

//dont
function addToDate(date, month) {
  // ...
}
const date = new Date();

// It's hard to tell from the function name what is added
addToDate(date, 1);

// do 

function addMonthToDate(month, date) {
  // ...
}

const date = new Date();
addMonthToDate(1, date);

//---------------Functions should only be one level of abstraction

//dont 
function parseBetterJSAlternative(code) {
  const REGEXES = [
    // ...
  ];

  const statements = code.split(" ");
  const tokens = [];
  REGEXES.forEach(REGEX => {
    statements.forEach(statement => {
      // ...
    });
  });

  const ast = [];
  tokens.forEach(token => {
    // lex...
  });

  ast.forEach(node => {
    // parse...
  });
}

// do 
function parseBetterJSAlternative(code) {
  const tokens = tokenize(code);
  const syntaxTree = parse(tokens);
  syntaxTree.forEach(node => {
    // parse...
  });
}

function tokenize(code) {
  const REGEXES = [
    // ...
  ];

  const statements = code.split(" ");
  const tokens = [];
  REGEXES.forEach(REGEX => {
    statements.forEach(statement => {
      tokens.push(/* ... */);
    });
  });

  return tokens;
}

function parse(tokens) {
  const syntaxTree = [];
  tokens.forEach(token => {
    syntaxTree.push(/* ... */);
  });

  return syntaxTree;
}

//---------------Remove duplicate code

//dont 
function showDeveloperList(developers) {
  developers.forEach(developer => {
    const expectedSalary = developer.calculateExpectedSalary();
    const experience = developer.getExperience();
    const githubLink = developer.getGithubLink();
    const data = {
      expectedSalary,
      experience,
      githubLink
    };

    render(data);
  });
}

function showManagerList(managers) {
  managers.forEach(manager => {
    const expectedSalary = manager.calculateExpectedSalary();
    const experience = manager.getExperience();
    const portfolio = manager.getMBAProjects();
    const data = {
      expectedSalary,
      experience,
      portfolio
    };

    render(data);
  });
}

// do 
function showEmployeeList(employees) {
  employees.forEach(employee => {
    const expectedSalary = employee.calculateExpectedSalary();
    const experience = employee.getExperience();

    const data = {
      expectedSalary,
      experience
    };

    switch (employee.type) {
      case "manager":
        data.portfolio = employee.getMBAProjects();
        break;
      case "developer":
        data.githubLink = employee.getGithubLink();
        break;
    }

    render(data);
  });
}

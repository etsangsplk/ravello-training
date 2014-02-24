
var adminUser = {
    _id: ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
    firstName : "Admin",
    surname : "",
    username : "admin",
    password : "$2a$10$sYPGeB3jT5teA6s1jPr3UOUZFq3JVxo5F5A/ZZaHJG7Yi2TuLtkM2",
    role : "TRAINER",
    salt : "$2a$10$sYPGeB3jT5teA6s1jPr3UO",
    ravelloCredentials: {
        _id: ObjectId('112233445566778899001122'),
        username: 'daniel.wolf@ravellosystems.com',
        password: '!Q@W3e4r'
    }
};

var galUser = {
    _id : ObjectId("333322222222222222222222"),
    firstName : "Gal",
    surname : "Moav",
    username : "gal",
    password : "$2a$10$sYPGeB3jT5teA6s1jPr3UOUZFq3JVxo5F5A/ZZaHJG7Yi2TuLtkM2",
    role : "STUDENT",
    salt : "$2a$10$sYPGeB3jT5teA6s1jPr3UO"
}

var galStudent = {  
    _id : ObjectId("333322222222222222220000"),
    user : ObjectId("333322222222222222222222"), 
    blueprintPermissions : [
        {   
            bpId : "41386003",
            startVms : true, 
            stopVms : true,
            console : true 
        } 
    ],   
    ravelloCredentials : {
        useClassCredentials : false,  
        username : "daniel.wolf@ravellosystems.com",  
        password : "!Q@W3e4r" 
    },  
    apps : [  
        {   
            ravelloId : "42434767" 
        } 
    ] 
}

var danielUser = {
    _id: ObjectId('111111111111111111111111'),
    firstName : "Daniel",
    surname : "Wolf",
    username : "daniel",
    password : "$2a$10$sYPGeB3jT5teA6s1jPr3UOUZFq3JVxo5F5A/ZZaHJG7Yi2TuLtkM2",
    role : "STUDENT",
    salt : "$2a$10$sYPGeB3jT5teA6s1jPr3UO"
};

var danielStudent  = {
    _id: ObjectId('111111111111111111110000'),
    user: ObjectId('111111111111111111111111'), 
    blueprintPermissions: [
        {
            bpId: '42434571',
            startVms: true,
            stopVms: true,
            console: true
        } 
    ],
    ravelloCredentials: {
        useClassCredentials: false,
        username: 'daniel.wolf@ravellosystems.com',
        password: '!Q@W3e4r'
    },
    apps: [
        {
            ravelloId: '42434647'
        }
    ]
};

var hadasUser = {
    firstName : "Hadas",
    _id: ObjectId('222222222222222222222222'),
    surname : "Birin",
    username : "hadas",
    password : "$2a$10$sYPGeB3jT5teA6s1jPr3UOUZFq3JVxo5F5A/ZZaHJG7Yi2TuLtkM2",
    role : "STUDENT",
    salt : "$2a$10$sYPGeB3jT5teA6s1jPr3UO"
};

var hadasStudent = {
    _id: ObjectId('222222222222222222220000'),
    user: ObjectId('222222222222222222222222'),
    blueprintPermissions: [
        {
            bpId: '42434571',
            startVms: true,
            stopVms: true,
            console: true
        } 
    ],
    ravelloCredentials: {
        useClassCredentials: false,
        username: 'daniel.wolf@ravellosystems.com',
        password: '!Q@W3e4r'
    },
    apps: [
        {
            ravelloId: '42434650'
        }
    ]
};

var course01 = {
    _id: ObjectId('cccccccccccccccccccc1111'),
    name: 'course01',
    description: 'tryout course',
    blueprints: [
        {
            id: '42434571',
            displayForStudents: 'Environment 01'
        }
    ]
};

var course02 = {
    _id: ObjectId('cccccccccccccccccccc2222'),
    name: 'course02',
    description: 'tryout course 02',
    blueprints: [
        {
            id: '42434571',
            displayForStudents: 'Environment 02'
        }
    ]
};

var course03 = {
    _id: ObjectId('cccccccccccccccccccc3333'),
    name: 'CCSA-R77',
    description: 'Checkpoint CCSA-R77.',
    blueprints: [
        {
            id: '41386003',
            displayForStudents: 'Atlantis & UK'
        }
    ]
};

var class02 = {
    _id: ObjectId('cacacacacacacacacaca2222'),
    name: 'class 01',
    courseId: 'cccccccccccccccccccc2222',
    description: 'A tryout class',
    startDate: ISODate("2014-02-15T08:00:00Z"),
    endDate: ISODate("2014-02-16T13:00:00Z"),
    students: [
        danielStudent,
        hadasStudent
    ]
};

var class03 = {
    _id: ObjectId('cacacacacacacacacaca3333'),
    name: 'Demo class',
    courseId: 'cccccccccccccccccccc3333',
    description: 'Demo.',
    startDate: ISODate("2014-02-25T08:00:00Z"),
    endDate: ISODate("2014-02-25T13:00:00Z"),
    students: [
        galStudent
    ]
};

db.trainingclasses.remove();
db.trainingcourses.remove();
db.users.remove();

db.users.save(adminUser);
db.users.save(galUser);
db.users.save(danielUser);
db.users.save(hadasUser);

db.trainingcourses.save(course01);
db.trainingcourses.save(course02);
db.trainingcourses.save(course03);

db.trainingclasses.save(class02);
db.trainingclasses.save(class03);

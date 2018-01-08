--Up
CREATE TABLE Patient (patientId INTEGER PRIMARY KEY, firstName TEXT, surname TEXT, birthDate TEXT, identifier TEXT, gender INTEGER);
CREATE TABLE PatientMedication (id INTEGER PRIMARY KEY ,patientId INTEGER, drugName TEXT, dose TEXT,prescribedOn TEXT,CONSTRAINT Patient_fk_patientId FOREIGN KEY (patientId)
    REFERENCES Patient (id));
CREATE TABLE Ward (wardId INTEGER PRIMARY KEY ,name TEXT, code TEXT);
CREATE TABLE Encounter (encounterId INTEGER PRIMARY KEY, encounterType INT,  patientId INT ,date TEXT, consultant TEXT, wardId INT);

CREATE TABLE OpenWardStayAndAttendance (encounterId,wardId INTEGER,UNIQUE(encounterId, wardId) ON CONFLICT REPLACE,CONSTRAINT Encounter_fk_encounterId FOREIGN KEY (encounterId)
    REFERENCES Encounter (encounterId),CONSTRAINT Ward_fk_wardId FOREIGN KEY (encounterId)
    REFERENCES Ward (wardId));

INSERT INTO Patient (firstName, surname, birthDate, identifier, gender) VALUES ('Jon', 'Snow', '12/12/1980','12345678911', 0);
INSERT INTO Patient (firstName, surname, birthDate, identifier, gender) VALUES ('Wonder', 'Woman', '10/02/1989','8599362895', 1);
INSERT INTO Patient (firstName, surname, birthDate, identifier, gender) VALUES ('Kara', 'Zor-El', '15/05/1988','0312803729', 1);
INSERT INTO Patient (firstName, surname, birthDate, identifier, gender) VALUES ('Natasha', 'Romanoff', '18/08/1977','3570863875', 1);
INSERT INTO Patient (firstName, surname, birthDate, identifier, gender) VALUES ('Steven', 'Rodgers', '01/04/1968','6541437858', 0);
INSERT INTO Patient (firstName, surname, birthDate, identifier, gender) VALUES ('Cersei', 'Lannister', '03/08/1981','2307075143', 1);
INSERT INTO Patient (firstName, surname, birthDate, identifier, gender) VALUES ('Bruce', 'Banner', '25/09/1974','5094811274', 0);
INSERT INTO Patient (firstName, surname, birthDate, identifier, gender) VALUES ('Frank', 'Castle', '29/06/1945','7773648522', 0);
INSERT INTO Patient (firstName, surname, birthDate, identifier, gender) VALUES ('Tony', 'Stark', '03/08/1981','2307075143', 0);
INSERT INTO Patient (firstName, surname, birthDate, identifier, gender) VALUES ('Diana', 'Prince', '25/09/1974','5094811274', 1);
INSERT INTO Patient (firstName, surname, birthDate, identifier, gender) VALUES ('Nick', 'Fury', '29/06/1945','7773648522', 0);

INSERT INTO PatientMedication (patientId, drugName, dose, prescribedOn) VALUES (1,'Atorvastatin ','20mg tablet once a day', '17/03/2017');
INSERT INTO PatientMedication (patientId, drugName, dose, prescribedOn) VALUES (1,'Amoxicillin','500mg twice a day', '10/01/2016');
INSERT INTO PatientMedication (patientId, drugName, dose, prescribedOn) VALUES (1,'Co-codamol',' 15mg/500mg tablets one or two 4 times/day', '08/12/2016');
INSERT INTO PatientMedication (patientId, drugName, dose, prescribedOn) VALUES (1,'Prednisolone','10mg once a day', '01/05/2011');
INSERT INTO PatientMedication (patientId, drugName, dose, prescribedOn) VALUES (2,'Zopiclone','3.75mg tablets, one at night if needed to help sleep', '09/05/2015');
INSERT INTO PatientMedication (patientId, drugName, dose, prescribedOn) VALUES (2,'Aspirin ','75mg dispersible tablets, ONE IN A MORNING', '18/03/2010');
INSERT INTO PatientMedication (patientId, drugName, dose, prescribedOn) VALUES (2,'Citalopram','20mg tablets once a day', '10/01/2016');
INSERT INTO PatientMedication (patientId, drugName, dose, prescribedOn) VALUES (3,'Zopiclone','3.75mg tablets, one at night if needed to help sleep', '09/05/2015');
INSERT INTO PatientMedication (patientId, drugName, dose, prescribedOn) VALUES (3,'Aspirin ','75mg dispersible tablets, ONE IN A MORNING', '18/03/2010');
INSERT INTO PatientMedication (patientId, drugName, dose, prescribedOn) VALUES (3,'Citalopram','20mg tablets once a day', '10/01/2016');
INSERT INTO PatientMedication (patientId, drugName, dose, prescribedOn) VALUES (4,'Zopiclone','3.75mg tablets, one at night if needed to help sleep', '09/05/2015');
INSERT INTO PatientMedication (patientId, drugName, dose, prescribedOn) VALUES (4,'Aspirin ','75mg dispersible tablets, ONE IN A MORNING', '18/03/2010');
INSERT INTO PatientMedication (patientId, drugName, dose, prescribedOn) VALUES (4,'Citalopram','20mg tablets once a day', '10/01/2016');
INSERT INTO PatientMedication (patientId, drugName, dose, prescribedOn) VALUES (5,'Aspirin ','75mg dispersible tablets, ONE IN A MORNING', '18/03/2010');
INSERT INTO PatientMedication (patientId, drugName, dose, prescribedOn) VALUES (6,'Aspirin ','75mg dispersible tablets, ONE IN A MORNING', '18/03/2010');
INSERT INTO PatientMedication (patientId, drugName, dose, prescribedOn) VALUES (7,'Aspirin ','75mg dispersible tablets, ONE IN A MORNING', '18/03/2010');
INSERT INTO PatientMedication (patientId, drugName, dose, prescribedOn) VALUES (8,'Aspirin ','75mg dispersible tablets, ONE IN A MORNING', '18/03/2010');

INSERT INTO Ward (wardId, name, code) VALUES (1,'Leeds General Infirmary L21','L21');

INSERT INTO Encounter (encounterId,patientId,encounterType,date,consultant,wardId) VALUES (1,1,0,'31/12/2018','Dr Nick Jones',1);
INSERT INTO Encounter (encounterId,patientId,encounterType,date,consultant,wardId) VALUES (2,2,0,'01/01/2018','Dr Kate Allen',1);
INSERT INTO Encounter (encounterId,patientId,encounterType,date,consultant,wardId) VALUES (3,3,0,'02/01/2018','Dr Rick Smith',1);
INSERT INTO Encounter (encounterId,patientId,encounterType,date,consultant,wardId) VALUES (4,4,0,'07/01/2018','Dr Clark Kent',1);
INSERT INTO Encounter (encounterId,patientId,encounterType,date,consultant,wardId) VALUES (5,5,0,'10/01/2018','Dr Bruce Wayne',1);
INSERT INTO Encounter (encounterId,patientId,encounterType,date,consultant,wardId) VALUES (6,6,0,'12/01/2018','Dr Brian Singh',1);
INSERT INTO Encounter (encounterId,patientId,encounterType,date,consultant,wardId) VALUES (7,7,0,'15/01/2018','Dr Vidya Cater',1);
INSERT INTO Encounter (encounterId,patientId,encounterType,date,consultant,wardId) VALUES (8,8,0,'16/01/2018','Dr Paul Sidhu',1);

INSERT INTO OpenWardStayAndAttendance (encounterId,wardId) VALUES (1,1);
INSERT INTO OpenWardStayAndAttendance (encounterId,wardId) VALUES (2,1);
INSERT INTO OpenWardStayAndAttendance (encounterId,wardId) VALUES (3,1);
INSERT INTO OpenWardStayAndAttendance (encounterId,wardId) VALUES (4,1);
INSERT INTO OpenWardStayAndAttendance (encounterId,wardId) VALUES (5,1);
INSERT INTO OpenWardStayAndAttendance (encounterId,wardId) VALUES (6,1);
INSERT INTO OpenWardStayAndAttendance (encounterId,wardId) VALUES (7,1);
INSERT INTO OpenWardStayAndAttendance (encounterId,wardId) VALUES (8,1);

CREATE VIEW PatientsOnWard_View AS
SELECT e.date, e.consultant, e.encounterType, p.firstName, p.patientId, p.surname, p.birthDate, p.identifier, p.gender, w.wardId as wardId, e.encounterId
FROM  OpenWardStayAndAttendance ow
Join Encounter e on e.encounterId = ow.encounterId
JOIN Patient p on p.patientId = e.patientId
JOIN Ward w on w.wardId = ow.wardId;

-- Down 
DROP TABLE PatientMedication;
DROP TABLE Patient;
DROP TABLE Ward;
DROP TABLE Encounter;
DROP TABLE OpenWardStayAndAttendance;
DROP VIEW PatientsOnWard_View
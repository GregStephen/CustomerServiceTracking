DECLARE @user1Admin UNIQUEIDENTIFIER
DECLARE @user2 UNIQUEIDENTIFIER
DECLARE @contact UNIQUEIDENTIFIER
DECLARE @property UNIQUEIDENTIFIER
DECLARE @propertySystem UNIQUEIDENTIFIER
DECLARE @business UNIQUEIDENTIFIER
DECLARE @system UNIQUEIDENTIFIER
DECLARE @jobTypeInstall UNIQUEIDENTIFIER
DECLARE @jobTypeService UNIQUEIDENTIFIER
DECLARE @jobTypeRepair UNIQUEIDENTIFIER

/* Creates the business */
INSERT INTO [Business]
(
    [BusinessName],
	[AddressLine1],
    [City],
    [State],
    [ZipCode],
	[Latitude],
	[Longitude]
)
VALUES
(
	'Bloopers Business',
	'129 Sophie Drive',
	'Antioch',
	'TN',
	'37013',
	'36.03565',
	'-86.58211'
)

SELECT @business = [Id]
FROM [Business]
WHERE BusinessName = 'Bloopers Business'

INSERT INTO [ServiceOptions]
(
	[BusinessId],
	[ServiceOptionId]
)
VALUES
(
	@business,
	1
),
(
	@business,
	2
),
(
	@business,
	3
),
(
	@business,
	4
),
(
	@business,
	11
)


/* Creates an admin user and a personal user*/
INSERT INTO [User]
(
    [FirstName],
    [LastName],
    [FirebaseUid],
    [Admin],
	[BusinessId]
)
VALUES
(
	'Ben',
	'Blooper',
	'Fyq955AUwHRecZThPWfuslrIlUq2',
	1,
	@business
),
(
	'Greg',
	'Worker',
	'Yk3pvshTbMSKOlhNyhOUveXvBXf1',
	0,
	@business
)

SELECT @user1Admin = [Id]
FROM [User]
WHERE FirstName = 'Ben'

SELECT @user2 = [Id]
FROM [User]
WHERE FirstName = 'Greg'

/* Creates a property */
INSERT INTO [Property]
(
	[DisplayName],
	[Enabled],
	[BusinessId],
    [AddressLine1],
    [City],
    [State],
    [ZipCode],
	[Latitude],
	[Longitude]
)
VALUES
(
	'Long Hunter',
	1,
	@business,
	'719 Longhunter Ct',
	'Nashville',
	'TN',
	'37217',
	'36.0954',
	'-86.63862'
)


SELECT @property = [Id]
FROM [Property]
WHERE [AddressLine1] = '719 Longhunter Ct'

/* Creates a new System */
INSERT INTO [System]
(
    [Type],
    [Gallons],
    [Inches],
	[BusinessId]
)
VALUES
(
	'Bloopers System',
	30,
	20,
	@business
)

SELECT @system = [Id]
FROM [System]
WHERE [Type] = 'Bloopers System'

/* Creates a new Contact */
INSERT INTO [Contact]
(
    [FirstName],
    [LastName],
	[Primary],
	[PropertyId],
    [Email],
	[CellPhone],
	[HomePhone]
)

VALUES
(
	'Frank',
	'Customer',
	1,
	@property,
	'FrankCustomer@gmail.com',
	'1234567890',
	'9015960456'
)

SELECT @contact = [Id]
FROM [Contact]
WHERE FirstName = 'Frank'


/* Creates a new system for the property */
INSERT INTO [PropertySystem]
(
	[PropertyId],
	[DisplayName],
	[Enabled],
	[InstallDate],
	[Notes],
	[Nozzles],
	[SerialNumber],
	[Sold],
	[SprayCycles],
	[SprayDuration],
	[SystemId],
	[NextServiceDate],
	[ServiceOptionId]
)
VALUES
(
	@property,
	'First System',
	1,
	'2021-03-12 00:00:00.000',
	'Around back near the gate',
	10,
	'1239129123',
	0,
	4,
	30,
	@system,
	'2021-04-14 00:00:00.000',
	11
)

SELECT @propertySystem = [Id]
FROM [PropertySystem]
WHERE [SerialNumber] = '1239129123'


/* Creates new Job Types */
INSERT INTO [JobType]
(
    [Type]
)
VALUES
(
	'Install'
),
(
	'Service'
),
(
	'Repair'
)


SELECT @jobTypeInstall = [Id]
FROM [JobType]
WHERE [Type] = 'Install'

SELECT @jobTypeService = [Id]
FROM [JobType]
WHERE [Type] = 'Service'

SELECT @jobTypeRepair = [Id]
FROM [JobType]
WHERE [Type] = 'Repair'

INSERT INTO [Report]
(
    [AmountRemaining],
    [PropertyId],
    [InchesAdded],
	[JobTypeId],
    [Notes],
	[ServiceDate],
	[SolutionAdded],
	[SystemId],
	[TechnicianId]
)
VALUES
(
	0,
	@property,
	20,
	@jobTypeInstall,
	'All lines look good',
	'2021-03-12 09:20:03.000',
	5,
	@propertySystem,
	@user2
)


SELECT * FROM [User], [Report], [Property]
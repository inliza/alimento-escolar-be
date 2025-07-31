-- Tabla Company
CREATE TABLE Company (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    rnc TEXT,
    owner TEXT,
    isActive BOOLEAN DEFAULT TRUE,
    isDeleted BOOLEAN DEFAULT FALSE,
    create_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Profiles
CREATE TABLE Profiles (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

-- Tabla Users
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    idCompany INTEGER NOT NULL REFERENCES Company(id) ON DELETE CASCADE,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    idProfile INTEGER NOT NULL REFERENCES Profiles(id) ON DELETE SET NULL,
    isActive BOOLEAN DEFAULT TRUE,
    isDeleted BOOLEAN DEFAULT FALSE,
    create_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdBy TEXT
);
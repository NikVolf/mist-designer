/**
 * Created by nvolf on 28.12.2015.
 */

var exports = module.exports = {};

var primitiveTypes = ["string", "double", "bool", "dateTime", "timeSpan", "int"];

var _ = require("underscore");

var entities =



    [
        {
            "id": "cmw.account.Account",
            "name": "AccountAccount",

            "attributes": [
                {
                    "id": "cmw.systemType",
                    "name": "systemType",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.creator",
                    "name": "creator",
                    "typeName": "AccountAccount",
                    "type": "cmw.account.Account",
                },
                {
                    "id": "cmw.creationDate",
                    "name": "creationDate",
                    "typeName": "dateTime",
                    "type": "dateTime",
                },
                {
                    "id": "cmw.lastWriteDate",
                    "name": "lastWriteDate",
                    "typeName": "dateTime",
                    "type": "dateTime",
                },
                {
                    "id": "cmw.account.isSystemAdministrator",
                    "name": "isSystemAdministrator",
                    "typeName": "boolean",
                    "type": "boolean",
                },
                {
                    "id": "cmw.account.displayName",
                    "name": "displayName",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.account.fullName",
                    "name": "fullName",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.account.manager",
                    "name": "manager",
                    "typeName": "AccountAccount",
                    "type": "cmw.account.Account",
                },
                {
                    "id": "cmw.account.mbox",
                    "name": "mbox",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.account.phone",
                    "name": "phone",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.account.instantMessagingId",
                    "name": "instantMessagingId",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.account.status",
                    "name": "status",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.account.skype",
                    "name": "skype",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.account.username",
                    "name": "username",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.account.active",
                    "name": "active",
                    "typeName": "boolean",
                    "type": "boolean",
                },
                {
                    "id": "cmw.account.lastLoginDate",
                    "name": "lastLoginDate",
                    "typeName": "dateTime",
                    "type": "dateTime",
                },
                {
                    "id": "cmw.account.language",
                    "name": "language",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.account.sid",
                    "name": "sid",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.account.notificationSettings",
                    "name": "notificationSettings",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.account.password",
                    "name": "password",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.account.userpic",
                    "name": "userpic",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.account.userpicUri",
                    "name": "userpicUri",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.account.userpicLarge",
                    "name": "userpicLarge",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.account.userpicLargeUri",
                    "name": "userpicLargeUri",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.account.title",
                    "name": "title",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.account.department",
                    "name": "department",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.account.office",
                    "name": "office",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.account.userGroupMembership",
                    "name": "userGroupMembership",
                    "typeName": "AccountGroup",
                    "type": "cmw.account.Group",
                },
                {
                    "id": "cmw.account.authenticationMethod",
                    "name": "authenticationMethod",
                    "typeName": "AuthenticationAuthenticationScheme",
                    "type": "cmw.authentication.AuthenticationScheme",
                },
                {
                    "id": "cmw.account.defaultAuthenticationMethod",
                    "name": "defaultAuthenticationMethod",
                    "typeName": "AuthenticationAuthenticationScheme",
                    "type": "cmw.authentication.AuthenticationScheme",
                },
                {
                    "id": "cmw.account.subordinates",
                    "name": "subordinates",
                    "typeName": "AccountAccount",
                    "type": "cmw.account.Account",
                },
                {
                    "id": "cmw.account.substitute",
                    "name": "substitute",
                    "typeName": "AccountAccount",
                    "type": "cmw.account.Account",
                },
                {
                    "id": "cmw.account.substituteDateFrom",
                    "name": "substituteDateFrom",
                    "typeName": "dateTime",
                    "type": "dateTime",
                },
                {
                    "id": "cmw.account.substituteDateTo",
                    "name": "substituteDateTo",
                    "typeName": "dateTime",
                    "type": "dateTime",
                },
                {
                    "id": "cmw.account.birthday",
                    "name": "birthday",
                    "typeName": "dateTime",
                    "type": "dateTime",
                },
                {
                    "id": "cmw.account.likes",
                    "name": "likes",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.account.personalCalendarId",
                    "name": "personalCalendarId",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.account.personalCalendarUri",
                    "name": "personalCalendarUri",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.account.presentedOnOrgchart",
                    "name": "presentedOnOrgchart",
                    "typeName": "boolean",
                    "type": "boolean",
                },
                {
                    "id": "cmw.account.timeZone",
                    "name": "timeZone",
                    "typeName": "string",
                    "type": "string",
                },
            ]
        },
        {
            "id": "cmw.account.Group",
            "name": "AccountGroup",

            "attributes": [
                {
                    "id": "cmw.account.groupName",
                    "name": "groupName",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.account.groupDescription",
                    "name": "groupDescription",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.account.userCount",
                    "name": "userCount",
                    "typeName": "decimal",
                    "type": "decimal",
                },
                {
                    "id": "cmw.account.groupUsers",
                    "name": "groupUsers",
                    "typeName": "AccountAccount",
                    "type": "cmw.account.Account",
                },
                {
                    "id": "cmw.account.subGroups",
                    "name": "subGroups",
                    "typeName": "AccountGroup",
                    "type": "cmw.account.Group",
                },
                {
                    "id": "cmw.account.groupParents",
                    "name": "groupParents",
                    "typeName": "AccountGroup",
                    "type": "cmw.account.Group",
                },
                {
                    "id": "cmw.account.member",
                    "name": "member",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.account.grouppic",
                    "name": "grouppic",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.account.grouppicUri",
                    "name": "grouppicUri",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.account.grouppicLarge",
                    "name": "grouppicLarge",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.account.grouppicLargeUri",
                    "name": "grouppicLargeUri",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.account.sid",
                    "name": "sid",
                    "typeName": "string",
                    "type": "string",
                },
            ]
        },
        {
            "id": "cmw.account.notificationSettings",
            "name": "AccountNotificationSettings",

            "attributes": [
            ]
        },
        {
            "id": "cmw.account.SystemAccount",
            "name": "AccountSystemAccount",

            "attributes": [
                {
                    "id": "cmw.systemType",
                    "name": "systemType",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.account.displayName",
                    "name": "displayName",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.account.fullName",
                    "name": "fullName",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.account.username",
                    "name": "username",
                    "typeName": "string",
                    "type": "string",
                },
            ]
        },
        {
            "id": "cmw.accountProperty",
            "name": "AccountProperty",

            "attributes": [
            ]
        },
        {
            "id": "cmw.authentication.AuthenticationScheme",
            "name": "AuthenticationAuthenticationScheme",

            "attributes": [
                {
                    "id": "cmw.authentication.domain",
                    "name": "domain",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.authentication.syncAccount",
                    "name": "syncAccount",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.authentication.syncAccountPassword",
                    "name": "syncAccountPassword",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.authentication.syncOnChanges",
                    "name": "syncOnChanges",
                    "typeName": "boolean",
                    "type": "boolean",
                },
                {
                    "id": "cmw.authentication.baseDN",
                    "name": "baseDN",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.authentication.resetPasswordSubject",
                    "name": "resetPasswordSubject",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.authentication.resetPasswordBody",
                    "name": "resetPasswordBody",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.authentication.resetPasswordTimeoutHours",
                    "name": "resetPasswordTimeoutHours",
                    "typeName": "decimal",
                    "type": "decimal",
                },
                {
                    "id": "cmw.authentication.groupFilter",
                    "name": "groupFilter",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.authentication.enableDataModification",
                    "name": "enableDataModification",
                    "typeName": "boolean",
                    "type": "boolean",
                },
                {
                    "id": "cmw.authentication.timeout",
                    "name": "timeout",
                    "typeName": "integer",
                    "type": "integer",
                },
                {
                    "id": "cmw.authentication.lastLdapSyncTime",
                    "name": "lastLdapSyncTime",
                    "typeName": "dateTime",
                    "type": "dateTime",
                },
            ]
        },
        {
            "id": "cmw.authentication.LdapGoup",
            "name": "AuthenticationLdapGoup",

            "attributes": [
                {
                    "id": "cmw.authentication.ldapGroupName",
                    "name": "ldapGroupName",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.authentication.ldapGroupId",
                    "name": "ldapGroupId",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.authentication.ldapMembersCount",
                    "name": "ldapMembersCount",
                    "typeName": "integer",
                    "type": "integer",
                },
                {
                    "id": "cmw.authentication.ldapSelectedToSync",
                    "name": "ldapSelectedToSync",
                    "typeName": "boolean",
                    "type": "boolean",
                },
            ]
        },
        {
            "id": "cmw.authentication.LdapMapping",
            "name": "AuthenticationLdapMapping",

            "attributes": [
                {
                    "id": "cmw.authentication.ldapMappingList",
                    "name": "ldapMappingList",
                    "typeName": "AuthenticationLdapMappingRecord",
                    "type": "cmw.authentication.LdapMappingRecord",
                },
                {
                    "id": "cmw.authentication.ldapMember",
                    "name": "ldapMember",
                    "typeName": "string",
                    "type": "string",
                },
            ]
        },
        {
            "id": "cmw.authentication.LdapMappingRecord",
            "name": "AuthenticationLdapMappingRecord",

            "attributes": [
                {
                    "id": "cmw.authentication.ldapMappingRecordGroup",
                    "name": "ldapMappingRecordGroup",
                    "typeName": "AccountGroup",
                    "type": "cmw.account.Group",
                },
                {
                    "id": "cmw.authentication.ldapMappingRecordMember",
                    "name": "ldapMappingRecordMember",
                    "typeName": "string",
                    "type": "string",
                },
            ]
        },
        {
            "id": "cmw.bookmark.Mark",
            "name": "BookmarkMark",

            "attributes": [
                {
                    "id": "cmw.bookmark.target",
                    "name": "target",
                    "typeName": "string",
                    "type": "string",
                },
            ]
        },
        {
            "id": "cmw.communication.Channel",
            "name": "CommunicationChannel",

            "attributes": [
                {
                    "id": "cmw.isSystem",
                    "name": "isSystem",
                    "typeName": "boolean",
                    "type": "boolean",
                },
                {
                    "id": "cmw.communication.channel.name",
                    "name": "name",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.communication.channel.description",
                    "name": "description",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.communication.channel.isDefault",
                    "name": "isDefault",
                    "typeName": "boolean",
                    "type": "boolean",
                },
                {
                    "id": "cmw.communication.channel.linkDomain",
                    "name": "linkDomain",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.communication.channel.outboundSocket",
                    "name": "outboundSocket",
                    "typeName": "CommunicationOutboundSocket",
                    "type": "cmw.communication.OutboundSocket",
                },
                {
                    "id": "cmw.communication.channel.inboundSocket",
                    "name": "inboundSocket",
                    "typeName": "CommunicationInboundSocket",
                    "type": "cmw.communication.InboundSocket",
                },
            ]
        },
        {
            "id": "cmw.communication.InboundImapSocket",
            "name": "CommunicationInboundImapSocket",

            "attributes": [
                {
                    "id": "cmw.communication.socket.serverUri",
                    "name": "serverUri",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.communication.socket.port",
                    "name": "port",
                    "typeName": "integer",
                    "type": "integer",
                },
                {
                    "id": "cmw.communication.socket.encryption",
                    "name": "encryption",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.communication.socket.username",
                    "name": "username",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.communication.socket.password",
                    "name": "password",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.communication.socket.receiver",
                    "name": "receiver",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.communication.socket.pollingInterval",
                    "name": "pollingInterval",
                    "typeName": "duration",
                    "type": "duration",
                },
            ]
        },
        {
            "id": "cmw.communication.InboundSocket",
            "name": "CommunicationInboundSocket",

            "attributes": [
                {
                    "id": "cmw.systemType",
                    "name": "systemType",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.communication.socket.isEnabled",
                    "name": "isEnabled",
                    "typeName": "boolean",
                    "type": "boolean",
                },
            ]
        },
        {
            "id": "cmw.communication.OutboundAppleSocket",
            "name": "CommunicationOutboundAppleSocket",

            "attributes": [
                {
                    "id": "cmw.communication.socket.serverUri",
                    "name": "serverUri",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.communication.socket.port",
                    "name": "port",
                    "typeName": "integer",
                    "type": "integer",
                },
                {
                    "id": "cmw.communication.socket.certificate",
                    "name": "certificate",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.communication.socket.password",
                    "name": "password",
                    "typeName": "string",
                    "type": "string",
                },
            ]
        },
        {
            "id": "cmw.communication.OutboundExchangeSocket",
            "name": "CommunicationOutboundExchangeSocket",

            "attributes": [
                {
                    "id": "cmw.communication.socket.exchangeVersion",
                    "name": "exchangeVersion",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.communication.socket.serverUri",
                    "name": "serverUri",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.communication.socket.domain",
                    "name": "domain",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.communication.socket.username",
                    "name": "username",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.communication.socket.password",
                    "name": "password",
                    "typeName": "string",
                    "type": "string",
                },
            ]
        },
        {
            "id": "cmw.communication.OutboundSmtpSocket",
            "name": "CommunicationOutboundSmtpSocket",

            "attributes": [
                {
                    "id": "cmw.communication.socket.serverUri",
                    "name": "serverUri",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.communication.socket.port",
                    "name": "port",
                    "typeName": "integer",
                    "type": "integer",
                },
                {
                    "id": "cmw.communication.socket.encryption",
                    "name": "encryption",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.communication.socket.useAuthentication",
                    "name": "useAuthentication",
                    "typeName": "boolean",
                    "type": "boolean",
                },
                {
                    "id": "cmw.communication.socket.useDefaultCredentials",
                    "name": "useDefaultCredentials",
                    "typeName": "boolean",
                    "type": "boolean",
                },
                {
                    "id": "cmw.communication.socket.username",
                    "name": "username",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.communication.socket.password",
                    "name": "password",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.communication.socket.sender",
                    "name": "sender",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.communication.socket.timeout",
                    "name": "timeout",
                    "typeName": "duration",
                    "type": "duration",
                },
            ]
        },
        {
            "id": "cmw.communication.OutboundSocket",
            "name": "CommunicationOutboundSocket",

            "attributes": [
                {
                    "id": "cmw.systemType",
                    "name": "systemType",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.communication.socket.isEnabled",
                    "name": "isEnabled",
                    "typeName": "boolean",
                    "type": "boolean",
                },
            ]
        },
        {
            "id": "cmw.configuration.Configuration",
            "name": "ConfigurationConfiguration",

            "attributes": [
                {
                    "id": "cmw.configuration.baseUri",
                    "name": "baseUri",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.configuration.defaultNotificationChannel",
                    "name": "defaultNotificationChannel",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.configuration.defaultManageByEmailServer",
                    "name": "defaultManageByEmailServer",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.configuration.defaultBackupPath",
                    "name": "defaultBackupPath",
                    "typeName": "string",
                    "type": "string",
                },
            ]
        },
        {
            "id": "cmw.crypt.Algorithm",
            "name": "CryptAlgorithm",

            "attributes": [
            ]
        },
        {
            "id": "cmw.crypt.EncryptSettings",
            "name": "CryptEncryptSettings",

            "attributes": [
                {
                    "id": "cmw.crypt.key",
                    "name": "key",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.crypt.iv",
                    "name": "iv",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.crypt.algorithm",
                    "name": "algorithm",
                    "typeName": "CryptAlgorithm",
                    "type": "cmw.crypt.Algorithm",
                },
            ]
        },
        {
            "id": "cmw.Database",
            "name": "Database",

            "attributes": [
                {
                    "id": "cmw.databaseId",
                    "name": "databaseId",
                    "typeName": "string",
                    "type": "string",
                },
            ]
        },
        {
            "id": "cmw.emailService.Server",
            "name": "EmailServiceServer",

            "attributes": [
                {
                    "id": "cmw.emailService.address",
                    "name": "address",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.emailService.port",
                    "name": "port",
                    "typeName": "integer",
                    "type": "integer",
                },
                {
                    "id": "cmw.emailService.login",
                    "name": "login",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.emailService.password",
                    "name": "password",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.emailService.incomingAddress",
                    "name": "incomingAddress",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.emailService.encryption",
                    "name": "encryption",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.emailService.pollingInterval",
                    "name": "pollingInterval",
                    "typeName": "integer",
                    "type": "integer",
                },
            ]
        },
        {
            "id": "cmw.enumProperty",
            "name": "EnumProperty",

            "attributes": [
            ]
        },
        {
            "id": "cmw.groupProperty",
            "name": "GroupProperty",

            "attributes": [
            ]
        },
        {
            "id": "cmw.instanceProperty",
            "name": "InstanceProperty",

            "attributes": [
            ]
        },
        {
            "id": "cmw.licensing.AccountProductInfo",
            "name": "LicensingAccountProductInfo",

            "attributes": [
                {
                    "id": "cmw.licensing.roles",
                    "name": "roles",
                    "typeName": "LicensingRole",
                    "type": "cmw.licensing.Role",
                },
                {
                    "id": "cmw.licensing.products",
                    "name": "products",
                    "typeName": "LicensingProduct",
                    "type": "cmw.licensing.Product",
                },
                {
                    "id": "cmw.licensing.infoDomain",
                    "name": "infoDomain",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.licensing.infoPlatformVersion",
                    "name": "infoPlatformVersion",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.licensing.infoSaas",
                    "name": "infoSaas",
                    "typeName": "boolean",
                    "type": "boolean",
                },
                {
                    "id": "cmw.licensing.infoFreeDiskSpacePercent",
                    "name": "infoFreeDiskSpacePercent",
                    "typeName": "double",
                    "type": "double",
                },
                {
                    "id": "cmw.licensing.infoFreeDiskSpaceBytes",
                    "name": "infoFreeDiskSpaceBytes",
                    "typeName": "double",
                    "type": "double",
                },
            ]
        },
        {
            "id": "cmw.licensing.ActivationResource",
            "name": "LicensingActivationResource",

            "attributes": [
                {
                    "id": "cmw.licensing.uri",
                    "name": "uri",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.licensing.activateMethod",
                    "name": "activateMethod",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.licensing.listMethod",
                    "name": "listMethod",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.licensing.activatedDaysAfterExpiration",
                    "name": "activatedDaysAfterExpiration",
                    "typeName": "integer",
                    "type": "integer",
                },
                {
                    "id": "cmw.licensing.networkSettings",
                    "name": "networkSettings",
                    "typeName": "LicensingNetworkSettings",
                    "type": "cmw.licensing.NetworkSettings",
                },
            ]
        },
        {
            "id": "cmw.licensing.Customer",
            "name": "LicensingCustomer",

            "attributes": [
                {
                    "id": "cmw.licensing.customer",
                    "name": "customer",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.licensing.email",
                    "name": "email",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.licensing.password",
                    "name": "password",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.licensing.country",
                    "name": "country",
                    "typeName": "string",
                    "type": "string",
                },
            ]
        },
        {
            "id": "cmw.licensing.NetworkSettings",
            "name": "LicensingNetworkSettings",

            "attributes": [
                {
                    "id": "cmw.licensing.proxyHost",
                    "name": "proxyHost",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.licensing.proxyPort",
                    "name": "proxyPort",
                    "typeName": "integer",
                    "type": "integer",
                },
                {
                    "id": "cmw.licensing.useIEProxySettings",
                    "name": "useIEProxySettings",
                    "typeName": "boolean",
                    "type": "boolean",
                },
                {
                    "id": "cmw.licensing.login",
                    "name": "login",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.licensing.password",
                    "name": "password",
                    "typeName": "string",
                    "type": "string",
                },
            ]
        },
        {
            "id": "cmw.licensing.Product",
            "name": "LicensingProduct",

            "attributes": [
            ]
        },
        {
            "id": "cmw.licensing.Role",
            "name": "LicensingRole",

            "attributes": [
            ]
        },
        {
            "id": "cmw.Privilege",
            "name": "Privilege",

            "attributes": [
                {
                    "id": "cmw.privilege.name",
                    "name": "name",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.privilege.description",
                    "name": "description",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.privilege.grantedTo",
                    "name": "grantedTo",
                    "typeName": "Role",
                    "type": "cmw.Role",
                },
                {
                    "id": "cmw.privilege.scopeClass",
                    "name": "scopeClass",
                    "typeName": "string",
                    "type": "string",
                },
            ]
        },
        {
            "id": "cmw.PrivilegeReference",
            "name": "PrivilegeReference",

            "attributes": [
                {
                    "id": "cmw.privilege.reference.scope",
                    "name": "scope",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.privilege.reference.grantedTo",
                    "name": "grantedTo",
                    "typeName": "Role",
                    "type": "cmw.Role",
                },
                {
                    "id": "cmw.privilege.reference.origin",
                    "name": "origin",
                    "typeName": "Privilege",
                    "type": "cmw.Privilege",
                },
            ]
        },
        {
            "id": "cmw.Property",
            "name": "Property",

            "attributes": [
                {
                    "id": "cmw.propertyType",
                    "name": "propertyType",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.propertyName",
                    "name": "propertyName",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.propertyDescription",
                    "name": "propertyDescription",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.propertyAttributes",
                    "name": "propertyAttributes",
                    "typeName": "PropertyAttribute",
                    "type": "cmw.PropertyAttribute",
                },
                {
                    "id": "cmw.isSystem",
                    "name": "isSystem",
                    "typeName": "boolean",
                    "type": "boolean",
                },
            ]
        },
        {
            "id": "cmw.PropertyAttribute",
            "name": "PropertyAttribute",

            "attributes": [
            ]
        },
        {
            "id": "cmw.qname",
            "name": "Qname",

            "attributes": [
            ]
        },
        {
            "id": "cmw.Role",
            "name": "Role",

            "attributes": [
                {
                    "id": "cmw.role.scope",
                    "name": "scope",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.role.name",
                    "name": "name",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.role.description",
                    "name": "description",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.role.person",
                    "name": "person",
                    "typeName": "AccountAccount",
                    "type": "cmw.account.Account",
                },
                {
                    "id": "cmw.role.group",
                    "name": "group",
                    "typeName": "AccountGroup",
                    "type": "cmw.account.Group",
                },
            ]
        },
        {
            "id": "cmw.rule.AllRulesList",
            "name": "RuleAllRulesList",

            "attributes": [
                {
                    "id": "cmw.rule.rulesList",
                    "name": "rulesList",
                    "typeName": "RuleRule",
                    "type": "cmw.rule.Rule",
                },
            ]
        },
        {
            "id": "cmw.rule.Rule",
            "name": "RuleRule",

            "attributes": [
                {
                    "id": "cmw.rule.text",
                    "name": "text",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.rule.filter",
                    "name": "filter",
                    "typeName": "boolean",
                    "type": "boolean",
                },
                {
                    "id": "cmw.rule.predicate",
                    "name": "predicate",
                    "typeName": "boolean",
                    "type": "boolean",
                },
                {
                    "id": "cmw.rule.target",
                    "name": "target",
                    "typeName": "string",
                    "type": "string",
                },
            ]
        },
        {
            "id": "cmw.rule.UserRule",
            "name": "RuleUserRule",

            "attributes": [
                {
                    "id": "cmw.rule.category",
                    "name": "category",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.rule.type",
                    "name": "type",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.rule.status",
                    "name": "status",
                    "typeName": "boolean",
                    "type": "boolean",
                },
            ]
        },
        {
            "id": "cmw.search.FieldMatch",
            "name": "SearchFieldMatch",

            "attributes": [
                {
                    "id": "cmw.search.matchedObjectId",
                    "name": "matchedObjectId",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.search.matchedObjectAuthor",
                    "name": "matchedObjectAuthor",
                    "typeName": "AccountAccount",
                    "type": "cmw.account.Account",
                },
                {
                    "id": "cmw.search.matchedObjectDate",
                    "name": "matchedObjectDate",
                    "typeName": "dateTime",
                    "type": "dateTime",
                },
                {
                    "id": "cmw.search.property",
                    "name": "property",
                    "typeName": "Property",
                    "type": "cmw.Property",
                },
                {
                    "id": "cmw.search.propertyName",
                    "name": "propertyName",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.search.propertyValue",
                    "name": "propertyValue",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.search.propertyValueFragment",
                    "name": "propertyValueFragment",
                    "typeName": "SearchFieldMatchFragment",
                    "type": "cmw.search.FieldMatchFragment",
                },
            ]
        },
        {
            "id": "cmw.search.FieldMatchFragment",
            "name": "SearchFieldMatchFragment",

            "attributes": [
                {
                    "id": "cmw.search.propertyValueMatchBegin",
                    "name": "propertyValueMatchBegin",
                    "typeName": "integer",
                    "type": "integer",
                },
                {
                    "id": "cmw.search.propertyValueMatchEnd",
                    "name": "propertyValueMatchEnd",
                    "typeName": "integer",
                    "type": "integer",
                },
            ]
        },
        {
            "id": "cmw.search.parameters.Parameters",
            "name": "SearchParametersParameters",

            "attributes": [
                {
                    "id": "cmw.search.parameters.searchProperty",
                    "name": "searchProperty",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.search.parameters.filterCreators",
                    "name": "filterCreators",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.search.parameters.filterContainers",
                    "name": "filterContainers",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.search.parameters.filterSystemTypes",
                    "name": "filterSystemTypes",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.search.parameters.filterFollower",
                    "name": "filterFollower",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.search.parameters.filterCreationDateMin",
                    "name": "filterCreationDateMin",
                    "typeName": "dateTime",
                    "type": "dateTime",
                },
                {
                    "id": "cmw.search.parameters.filterCreationDateMax",
                    "name": "filterCreationDateMax",
                    "typeName": "dateTime",
                    "type": "dateTime",
                },
                {
                    "id": "cmw.search.parameters.filterProperty",
                    "name": "filterProperty",
                    "typeName": "Property",
                    "type": "cmw.Property",
                },
                {
                    "id": "cmw.search.parameters.numResults",
                    "name": "numResults",
                    "typeName": "integer",
                    "type": "integer",
                },
                {
                    "id": "cmw.search.parameters.includeObjects",
                    "name": "includeObjects",
                    "typeName": "boolean",
                    "type": "boolean",
                },
            ]
        },
        {
            "id": "cmw.search.results.TabbedSearchResults",
            "name": "SearchResultsTabbedSearchResults",

            "attributes": [
                {
                    "id": "cmw.search.results.items",
                    "name": "items",
                    "typeName": "SearchSearchItem",
                    "type": "cmw.search.SearchItem",
                },
                {
                    "id": "cmw.search.results.tabs",
                    "name": "tabs",
                    "typeName": "string",
                    "type": "string",
                },
            ]
        },
        {
            "id": "cmw.search.SearchItem",
            "name": "SearchSearchItem",

            "attributes": [
                {
                    "id": "cmw.search.match",
                    "name": "match",
                    "typeName": "SearchFieldMatch",
                    "type": "cmw.search.FieldMatch",
                },
                {
                    "id": "cmw.search.itemId",
                    "name": "itemId",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.search.itemTitle",
                    "name": "itemTitle",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.search.itemSystemType",
                    "name": "itemSystemType",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.search.itemType",
                    "name": "itemType",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.search.itemTypeName",
                    "name": "itemTypeName",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.search.itemState",
                    "name": "itemState",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.search.itemCreationDate",
                    "name": "itemCreationDate",
                    "typeName": "dateTime",
                    "type": "dateTime",
                },
                {
                    "id": "cmw.search.itemLastWriteDate",
                    "name": "itemLastWriteDate",
                    "typeName": "dateTime",
                    "type": "dateTime",
                },
                {
                    "id": "cmw.search.itemObject",
                    "name": "itemObject",
                    "typeName": "string",
                    "type": "string",
                },
            ]
        },
        {
            "id": "cmw.security.s2s.Endpoint",
            "name": "SecurityS2sEndpoint",

            "attributes": [
                {
                    "id": "cmw.security.s2s.apiKey",
                    "name": "apiKey",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.security.s2s.publicKey",
                    "name": "publicKey",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.security.s2s.remoteUrl",
                    "name": "remoteUrl",
                    "typeName": "string",
                    "type": "string",
                },
            ]
        },
        {
            "id": "cmw.security.s2s.ServiceUrl",
            "name": "SecurityS2sServiceUrl",

            "attributes": [
                {
                    "id": "cmw.security.s2s.url",
                    "name": "url",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.security.s2s.keyPair",
                    "name": "keyPair",
                    "typeName": "string",
                    "type": "string",
                },
            ]
        },
        {
            "id": "cmw.ui.Action",
            "name": "UiAction",

            "attributes": [
                {
                    "id": "cmw.ui.actionTargetType",
                    "name": "actionTargetType",
                    "typeName": "string",
                    "type": "string",
                },
                {
                    "id": "cmw.ui.actionEnabled",
                    "name": "actionEnabled",
                    "typeName": "boolean",
                    "type": "boolean",
                },
                {
                    "id": "cmw.ui.actionHidden",
                    "name": "actionHidden",
                    "typeName": "boolean",
                    "type": "boolean",
                },
                {
                    "id": "cmw.ui.actionUIId",
                    "name": "actionUIId",
                    "typeName": "string",
                    "type": "string",
                },
            ]
        },
    ]


exports.listEntities = function(callback) {

    callback(entities);

};

exports.listEntityAttributes = function(entityId, callback) {
    var entity = _.findWhere(entities, { id: entityId });
    callback(_.uniq(entity.attributes));
}
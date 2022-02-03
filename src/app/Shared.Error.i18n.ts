import { I18nNamespace } from "./App.i18n"

export const SharedErrorI18n: I18nNamespace = {
  name: "error-codes",
  de: {
    ZEV_PRICE_PACKAGE_INVALID_ORDER: "Das Preispaket hat eine ungültige Reihenfolge",
    ZEV_PRICE_PACKAGE_INVALID_PRICE_STRUCTURE: "Das Preispaket hat eine ungültige Preisstruktur",
    ZEV_PRICE_PACKAGE_NOT_FOUND: "Das Preispaket konnte nicht gefunden werden",
    ZEV_PRICE_PACKAGE_CANNOT_DELETE_DEFAULT: "Das Standard-Preispaket kann nicht gelöscht werden",
    ZEV_PRICE_PACKAGE_ALREADY_EXISTS: "Das Preispaket existiert bereits",
    ZEV_PRICE_PACKAGE_INVALID_ID: "Die angegebene ID vom Preispaket ist ungültig",
    FORGOT_PASSWORD_TOKEN_VALIDATION:
      "Der von Ihnen genutzte Link ist ungültig. Bitte fordern Sie einen neuen Link an.",
    FORGOT_PASSWORD_ACTION_DONE:
      "Sie haben Ihr Passwort bereits mit diesem Link zurückgesetzt. Bitte fordern Sie einen neuen Link an.",
    FORGOT_PASSWORD_ACTION_EXPIRED:
      "Der von Ihnen genutzte Link ist abgelaufen. Bitte fordern Sie einen neuen Link an.",
    USER_ACCOUNT_MISCONFIGURED_PERSON:
      "Ihr Benutzerkonto ist noch nicht freigeschaltet. Bitte kontaktieren Sie den Support.",
    USER_ACCOUNT_MISCONFIGURED_ROLE:
      "Ihr Benutzerkonto hat keine Berechtigung für dieses Portal. Bitte kontaktieren Sie den Support.",
    USER_ACCOUNT_VERIFICATION_PENDING:
      "Ihr Benutzerkonto ist noch nicht verifiziert. Bitte bestätigen Sie Ihre E-Mail-Adresse.",
    USER_ACCOUNT_INVALID_CREDENTIALS: "Ihr Benutzername oder Passwort ist ungültig. Bitte versuchen Sie es erneut.",
    USER_ACCOUNT_INVALID_PASSWORD: "Das angegebene Passwort ist ungültig. Bitte versuchen Sie es erneut.",
    USER_ACCOUNT_EMAIL_ACTION_DONE:
      "Der von Ihnen genutzte Link wurde bereits verwenden. Bitte kontaktieren Sie den Support, " +
      "falls Sie sich nicht im Portal anmelden können.",
    USER_ACCOUNT_EMAIL_UNAVAILABLE:
      "Die eingegebene E-Mail-Adresse ist bereits in Gebrauch. Bitte versuchen Sie es mit einer anderen " +
      "E-Mail-Adresse oder kontaktieren Sie den Support.",
    USER_ACCOUNT_EMAIL_TOKEN_VALIDATION:
      "Die von Ihnen genutze Link ist ungültig. Bitte versuchen Sie es erneut oder kontaktieren Sie den Support.",
    USER_ACCOUNT_SET_PASSWORD_ACTION_DONE:
      "Sie haben Ihr Passwort bereits mit diesem Link zurückgesetzt. Bitte fordern Sie einen neuen Link an.",
    USER_ACCOUNT_SET_PASSWORD_ACTION_EXPIRED:
      "Der von Ihnen genutzte Link ist abgelaufen. Bitte fordern Sie einen neuen Link an.",
    USER_ACCOUNT_SET_PASSWORD_TOKEN_VALIDATION:
      "Die von Ihnen genutze Link ist ungültig. Bitte versuchen Sie es erneut oder kontaktieren Sie den Support.",
    USER_ACCOUNT_ALREADY_SETUP: "Dieses Profil hat bereits ein Benutzerkonto.",
    USER_ACCOUNT_VERIFICATION_EXPIRED:
      "Der von Ihnen genutzte Link ist abgelaufen. Bitte fordern Sie einen neuen Link an.",
    USER_ACCOUNT_BLOCKED:
      "Dieses Benutzerkonto ist derzeit deaktiviert. Versuchen Sie mit einem 'Passwort vergessen' " +
      "Ihr Benutzerkonto zu aktivieren. Falls dies nicht erfolgreich ist, bitte kontaktieren Sie den Support.",
    USER_ACCOUNT_INVALID_BLOCK_ACTION_USER: "Sie können nicht Ihr eigenes Benutzerkonto sperren.",
    INVALID_PASSWORD: "Das angegebene Passwort ist ungültig. Bitte versuchen Sie es erneut.",
    INVALID_EMAIL: "Die angegebene E-Mail ist ungültig. Bitte versuchen Sie es erneut.",
    ZEV_INVALID_ZEV_MANAGER: "Sie können keinen Administrator als ZEV Verwalter für ein ZEV verwenden.",
    ZEV_INVALID_BILLING_DATE:
      "Dies ist kein gültiges nächstes Abrechnungsdatum. Es muss am Ende eines Halbjahres (30.06 oder 31.12) sein.",
    ZEV_INVALID_ZEV_START_DATE:
      "Dies ist kein gültiges ZEV Startdatum. Es muss an oder nach dem Datum des Servicebeginns liegen.",
    OBJECT_NOT_FOUND: "Das gewünschte Objekt konnte nicht gefunden werden.",
    VALIDATION_ERROR: "Die Validierung der eingegebenen Daten ist fehlgeschlagen.",
    OTHER: "Etwas ist schief gelaufen :(",
    PERMISSION_ERROR: "Sie haben nicht die erforderlichen Rechte.",
    INVALID_ADMIN_EMAIL_DOMAIN: "Diese E-Mail Domäne ist für Administratoren nicht zugelassen.",
    INVALID_PRICE_COMPONENT_VALID_FROM_MONTH_START:
      "Das 'Gültig von'-Datum der Preiskomponente muss der erste Tag des Monats sein.",
    INVALID_PRICE_COMPONENT_VALID_UNTIL_BLANK_MONTH_END:
      "Das 'Gültig bis'-Datum der Preiskomponente muss entweder leer sein oder der letzte Tag eines Monats sein.",
    INVALID_PRICE_COMPONENT_VALID_UNTIL_FUTURE:
      "Das 'Gültig bis'-Datum der Preiskomponente muss der letzte Tag eines Monats sein.",
    INVALID_PRICE_COMPONENT_VALID_UNTIL_TERMINATION: "Es kann nur eine aktive Preiskomponente beendet werden.",
    INVALID_PRICE_COMPONENT_VALID_UNTIL_MONTH_END:
      "Das 'Gültig bis'-Datum der Preiskomponente muss der letzte Tag eines Monats sein.",
    INVALID_STATE_TRANSITION: "Das Objekt kann nicht in gewünschten Status gesetzt werden.",
    INVALID_PRICE_COMPONENT_PRODUCT_LINK: "Die Preiskomponente ist keinem Produkt zugewiesen",
    SERVICE_COMPONENT_NAME_UNAVAILABLE: "Der Name der Servicekomponente ist nicht verfügbar.",
    CONTRACT_ZEV_HAS_DRAFT_CONTRACT: "Es kann jeweils nur ein Vertragsentwurf für ein ZEV vorliegen.",
    CONTRACT_ZEV_HAS_APPROVED_CONTRACT:
      "Es kann jeweils nur ein freigegebener Vertrag für ein ZEV vorliegen. Verwenden Sie die Ersetzen " +
      "Funktion, falls Sie einen Vertrag ändern möchten.",
    CONTRACT_ZEV_ACTIVATION_WITHOUT_PREDECESSOR:
      "Der Vertrag kann ohne den vorherigen Vertrag nicht aktiviert werden, ausser es ist der erste Vertrag.",
    CONSUMPTION_POINT_ALREADY_VACANT: "Für diese Verbrauchsstelle ist bereits ein Leerstand erfasst.",
    CONSUMPTION_POINT_ZEV_PARTICIPANT_NOT_IN_ZEV: "Dieser ZEV-Teilnehmer ist nicht Teil dieses ZEVs.",
    CONSUMPTION_POINT_INVALID_SELF_ZEV_PARTICIPANT: "Der ZEV-Teilnehmer kann nicht durch sich selbst ersetzt werden.",
    INVALID_CONSUMPTION_POINT_STATE: "Die Verbrauchsstelle ist in einem ungültigem Zustand.",
    PRODUCT_USED_IN_CONTRACT:
      "Das Produkt kann nicht gelöscht werden, da es in einem oder mehreren Verträgen verwendet wird.",
    PRODUCT_NOT_LISTED:
      "Das Produkt kann nicht gelöscht werden, da es nicht aufgeführt ist oder bereits gelöscht wurde.",
    INVALID_METERING_CODE_LENGTH: "Der Metering Code muss 33 Zeichen lang sein.",
    NO_VALID_CONTRACT_FOUND: "Es wurde kein aktiver Vertrag für diesen ZEV gefunden.",
    PARTICIPATION_VACANCY_MODIFICATION:
      "Ein Leerstand kann nicht geändert werden. Ändern Sie das Einzugs- oder Auszugsdatum des " +
      "vorherigen oder nachfolgenden ZEV-Teilnehmers.",
    PARTICIPATION_FIRST_ENTRY_DATE_MODIFICATION:
      "Das Einzugsdatum des ersten ZEV-Teilnehmers oder Leerstands kann nicht geändert werden. " +
      "Es wird automatisch anhand des ZEV Startdatums gesetzt.",
    PARTICIPATION_MOVE_OUT_DATE_UNDEFINED:
      "Es ist noch kein Auszug definiert. Daher kann das Auszugsdatum nicht geändert werden.",
    PARTICIPATION_MOVE_BEFORE_ZSD: "Das Einzugsdatum kann nicht vor dem ZEV Startdatum liegen.",
    PARTICIPATION_MOVE_BILL_EXISTS:
      "Dieser ZEV-Teilnehmer kann nicht geändert werden, da bereits ein oder mehrere freigegebene " +
      "Abrechnungen vorliegen. Falls Sie den Teilnehmer ändern möchten, müssen die betroffenen " +
      "Abrechnungen zuerst in den Bearbeitungs-Modus gesetzt werden. Gehen Sie dazu zu einer Abrechnung " +
      "und klicken Sie auf 'Bearbeiten'.",
    PARTICIPATION_CANCEL_MOVE_IN_VACANCY_NO_MODIFICATION:
      "Ein Leerstand kann nicht geändert werden. Ändern Sie das Einzugs- oder Auszugsdatum des " +
      "vorherigen oder nachfolgenden ZEV-Teilnehmers.",
    PARTICIPATION_CANCEL_MOVE_IN_KNOWN_SUCCESSOR:
      "Dieser ZEV-Teilnehmer kann nicht gelöscht werden, wenn bereits ein Nachfolger definiert ist.",
    PARTICIPATION_CANCEL_MOVE_IN_BILL_EXISTS:
      "Dieser ZEV-Teilnehmer kann nicht gelöscht werden, da bereits ein oder mehrere freigegebene " +
      "Abrechnungen vorliegen. Falls Sie den Teilnehmer ändern möchten, müssen die betroffenen Abrechnungen " +
      "zuerst in den Bearbeitungs-Modus gesetzt werden. Gehen Sie dazu zu einer Abrechnung und klicken Sie auf " +
      "'Bearbeiten'.",
    PARTICIPATION_CANCEL_MOVE_IN_VACANCY_PERIOD_BILLED:
      "Dieser ZEV-Teilnehmer kann nicht gelöscht werden, da bereits Leerstände vollständig abgerechnet wurden. " +
      "Falls Sie den Teilnehmer löschen möchten, müssen die betroffenen Abrechnungen zuerst in den " +
      "Bearbeitungs-Modus gesetzt werden. Gehen Sie dazu zu einer Abrechnung und klicken Sie auf 'Bearbeiten'. ",
    PARTICIPATION_CANCEL_MOVE_OUT_VACANCY_NO_MODIFICATION:
      "Ein Leerstand kann nicht geändert werden. Ändern Sie das Einzugs- oder Auszugsdatum des vorherigen " +
      "oder nachfolgenden ZEV-Teilnehmers.",
    PARTICIPATION_CANCEL_MOVE_OUT_DATE_UNDEFINED:
      "Es ist kein Auszug gelöscht werden, da noch kein Auszug gemeldet wurde.",
    PARTICIPATION_CANCEL_MOVE_OUT_KNOWN_SUCCESSOR:
      "Ein Auszug kann nicht gelöscht werden, wenn bereits ein neuer ZEV-Teilnehmer als Nachfolger definiert ist.",
    PARTICIPATION_CANCEL_MOVE_OUT_NEXT_PARTICIPANT_KNOWN_SUCCESSOR:
      "Ein Auszug kann nicht gelöscht werden, wenn bereits ein neuer ZEV-Teilnehmer als Nachfolger definiert ist.",
    PARTICIPATION_CANCEL_MOVE_OUT_BILL_EXISTS:
      "Der Auszug des ZEV-Teilnehmers kann nicht gelöscht werden, da bereits ein oder mehrere freigegebene " +
      "Abrechnungen vorliegen. Falls Sie den Auszug löschen möchten, müssen die betroffenen Abrechnungen " +
      "zuerst in den Bearbeitungs-Modus gesetzt werden. Gehen Sie dazu zu einer Abrechnung und klicken " +
      "Sie auf 'Bearbeiten'.",
    PARTICIPATION_MOVE_IN_VACANCY_ONLY: "Ein Einzug kann nur auf einem Leerstand erfasst werden.",
    PARTICIPATION_MOVE_IN_DATE_BEFORE_VACANCY_START:
      "Das Einzugsdatum des ZEV-Teilnehmers kann nicht vor dem Beginn des Leerstands liegen.",
    PARTICIPATION_MOVE_IN_VACANCY_NO_SUCCESSOR:
      "Ein Einzug kann nicht auf einem Leerstand erfasst werden, wenn bereits ein Nachfolger erfasst ist.",
    PARTICIPATION_MOVE_IN_UNKNOWN_ZEV_PARTICIPANT: "Dieser ZEV-Teilnehmer ist nicht Teil dieses ZEVs.",
    PARTICIPATION_MOVE_IN_BILL_EXISTS:
      "Der Einzug des ZEV-Teilnehmers kann nicht erfasst werden, da für den Leerstand bereits ein oder mehrere " +
      "freigegebene Abrechnungen vorliegen. Falls Sie den Einzug erfassen möchten, müssen die betroffenen " +
      "Abrechnungen zuerst in den Bearbeitungs-Modus gesetzt werden. Gehen Sie dazu zu einer Abrechnung und " +
      "klicken Sie auf 'Bearbeiten'.",
    PARTICIPATION_MOVE_OUT_WITHOUT_NP_VACANCY_NO_MODIFICATION:
      "Ein Leerstand kann nicht geändert werden. Ändern Sie das Einzugs- oder Auszugsdatum des vorherigen " +
      "oder nachfolgenden ZEV-Teilnehmers.",
    PARTICIPATION_MOVE_OUT_WITHOUT_NP_KNOWN_SUCCESSOR:
      "Es kann kein Auszug erfasst werden, wenn bereits ein Nachfolger erfasst ist.",
    PARTICIPATION_MOVE_OUT_WITHOUT_NP_DATE_AFTER_MOVE_IN_DATE:
      "Das Auszugsdatum des ZEV-Teilnehmers muss nach dem Einzugsdatum des ZEV-Teilnehmers sein.",
    PARTICIPATION_MOVE_OUT_WITHOUT_NP_BILL_EXISTS:
      "Der Auszug des ZEV-Teilnehmers kann nicht erfasst werden, da bereits ein oder mehrere freigegebene " +
      "Abrechnungen vorliegen. Falls Sie den Auszug erfassen möchten, müssen die betroffenen Abrechnungen " +
      "zuerst in den Bearbeitungs-Modus gesetzt werden. Gehen Sie dazu zu einer Abrechnung und klicken Sie " +
      "auf 'Bearbeiten'.",
    PARTICIPATION_MOVE_OUT_WITH_NP_DATE_AFTER_MOVE_IN_DATE:
      "Das Auszugsdatum des ZEV-Teilnehmers muss nach dem Einzugsdatum des ZEV-Teilnehmers sein.",
    PARTICIPATION_MOVE_OUT_WITH_NP_DATE_BEFORE_NP_MOVE_IN:
      "Das Einzugsdatum des neuen ZEV-Teilnehmers muss nach dem Auszugsdatum des vorherigen ZEV-Teilnehmers sein.",
    PARTICIPATION_MOVE_OUT_WITH_NP_KNOWN_SUCCESSOR:
      "Es kann kein Auszug erfasst werden, wenn bereits ein Nachfolger erfasst ist.",
    PARTICIPATION_MOVE_OUT_WITH_NP_UNKNOWN_ZEV_PARTICIPANT: "Dieser ZEV-Teilnehmer ist nicht Teil dieses ZEVs.",
    PARTICIPATION_MOVE_OUT_WITH_NP_BILL_EXISTS:
      "Der Auszug des ZEV-Teilnehmers kann nicht erfasst werden, da bereits ein oder mehrere freigegebene " +
      "Abrechnungen vorliegen. Falls Sie den Auszug erfassen möchten, müssen die betroffenen Abrechnungen " +
      "zuerst in den Bearbeitungs-Modus gesetzt werden. Gehen Sie dazu zu einer Abrechnung und klicken Sie " +
      "auf 'Bearbeiten'.",
    PARTICIPATION_FIRST_ENTRY_EXISTS:
      "Es wurde bereits ein erster ZEV-Teilnehmer oder Leerstand für die Verbrauchsstelle erfasst.",
    SERVICE_BILLING_PROVIDE_START_END_DATES:
      "Sie müssen das Start- und Enddatum für eine wiederkehrende Abrechnung definieren.",
    SERVICE_BILLING_BILLED_ZEV_ACTIVE_TERMINATED:
      "Es können nur aktive oder inaktive & terminierte Zevs in Rechnung gestellt werden.",
    INDV_BILLING_AFTER_ZEV_START_DATE: "Das Abrechnungsdatum der initialen Rechnung muss nach dem ZEV Startdatum sein.",
    BILL_PRICES_NOT_PROVIDED:
      "Um eine Abrechnung zu erstellen, müssen Sie die ZEV Strompreise eintragen. Gehen Sie dazu auf das Dashboard.",
    USER_ACCOUNT_MISCONFIGURED_ZEV_MANAGER:
      "Sie sind keinem ZEV zugewiesen. Bitte melden Sie sich bei unserem Support.",
    SERVICE_BILLING_RUN_OVERLAPPING_OBJECT: "Es gibt bereits eine Dienstleistungsabrechnung für diese Periode.",
    ZEV_WRONG_USER_TYPE: "Nur eine Person mit dem Benutzertyp ZEV Manager kann ein ZEV Manager sein.",
    ZEV_WRONG_PRICES: "Sie haben nicht alle Strompreise definiert.",
    ZEV_REACTIVATION_DATE_MISSING: "Um den ZEV zu aktivieren, muss ein gültiges Datum angegeben werden.",
    ZEV_DEACTIVATION_DATE: "Das Service-Enddatum darf nicht vor dem Service-Startdatum liegen.",
    ZEV_DELETE_NOT_LISTED: "Der ZEV, welches Sie löschen möchten, ist nicht vorhanden.",
    CONSUMPTION_POINT_INACTIVE_BILLABLE_DATES:
      // eslint-disable-next-line quotes
      'Das "Abrechnungsfähig bis"-Datum muss nach dem "Abrechnungsfähig von"-Datum sein.',
    CONTRACT_TERMINATION_DATE: "Das Enddatum muss nach dem Startdatum sein.",
    CONTRACT_CANNOT_REPLACE_CONTRACT_WITH_INITIAL_BILLS:
      "Der vorherige Vertrag kann nicht komplett ersetzt werden, da noch initiale Dienstleistungsabrechnungen " +
      "für diesen existieren. Stornieren oder entfernen Sie diese, um den Vertrag zu ersetzen.",
    CONTRACT_CANNOT_REPLACE_CONTRACT_WITH_RECURRING_BILLS:
      "Der vorherige Vertrag kann nicht komplett ersetzt werden, da noch wiederkehrende Dienstleistungsabrechnungen " +
      "für diesen existieren. Stornieren oder entfernen Sie diese, um den Vertrag zu ersetzen.",
    PARTICIPATION_START_BEFORE_END: "Das Einzugsdatum des Teilnehmers muss vor dem Auszugsdatum sein.",
    PARTICIPATION_END_AFTER_START: "Das Auszugsdatum des Teilnehmers muss nach dem Einzugsdatum sein.",
    CONSUMPTION_POINT_START_BEFORE_END:
      // eslint-disable-next-line quotes
      'Das "Abrechnungsfähig von"-Datum des Verbrauchsstelle muss vor dem "Abrechnungsfähig bis"-Datum sein.',
    CONSUMPTION_POINT_UPDATE_START_DATE_WITH_EXISTING_BILLS:
      "Das Startdatum der Verbrauchsstelle kann nicht angepasst werden, wenn bereits Rechnungen für die " +
      "Teilnehmer existieren.",
    ALL_BILLING_INVALID_STATE_CUSTOMER:
      "Die Daten stehen nicht mehr zur Verfügung. Wir werden Sie per E-Mail benachrichtigen, sobald dieser" +
      " wieder verfügbar sind.",
    INDV_BILLING_INVALID_STATE_CUSTOMER:
      "Die Daten stehen nicht mehr zur Verfügung. Wir werden Sie per E-Mail benachrichtigen, sobald dieser" +
      " wieder verfügbar sind.",
    INDV_BILLING_BEFORE_SYSTEM_START:
      "Die Rechnungsperiode einer Mieterwechselabrechnung muss nach dem Systemstart liegen.",
    USER_ACCOUNT_ZEV_MANAGER_UNASSIGNED:
      "Für dieses Profil kann noch kein Login erstellt werden, da dieses Profil noch keinem ZEV als ZEV Verwalter " +
      "zugeordnet ist.",
    ZEV_EXTERNAL_REFERENCE_NUMBER_MISSING: "Zevs externe Referenznummer fehlt.",
    PRICE_COMPONENT_EXTERNAL_REFERENCE_NUMBER_MISSING:
      "Einer oder mehreren Preiskomponenten fehlt die externe Referenznummer.",
    SAP_SERVICE_BILLING_RECURRING_DATES_NULL:
      "Bei der wiederkehrenden Service-Abrechnung fehlt entweder das Startdatum oder das Enddatum.",
    SAP_SERVICE_BILLING_TYPES_MISMATCH: "Nicht alle Service Billing-Typen sind gleich.",
    SAP_SERVICE_BILLING_MISSING_RETURN_ITEM:
      "Für mindestens eine Rechnung konnte keine Response in der SAP Antwort gefunden werden.",
    SAP_GENERAL_FAILURE: "Beim SAP-Anbieter ist ein Fehler aufgetreten.",
    ZEV_PARTICIPANT_DELETE_IN_USE:
      "Der Teilnehmer kann nicht gelöscht werden, da er in mindestens einer anderen Teilnahme verwendet wird.",
    SERVICE_BILLING_RUN_SAP_UPDATE_SOME_WITHOUT_RESULT: "Ein oder mehrere Einträge haben kein Ergebnis",
    SERVICE_BILLING_RUN_SAP_UPDATE_MISMATCH:
      "Ein oder mehrere Einträge gehören nicht zu diesem Service-Abrechnungslauf",
    SERVICE_BILLING_RUN_SAP_UPDATE_MISSING_DATA: "Ein oder mehrere Einträge fehlen",
    PRODUCT_COLLECTION_RESTRICTED_ACCESS:
      "Der Zugriff auf diese Ressource wird basierend auf dem Typ der Servicekomponente des Produkts eingeschränkt: " +
      "Inkasso",
    PARTICIPANTS_ALREADY_CONFIRMED_SAP_SYNC: "Der Teilnehmer wurde bereits synchronisiert.",
    BILLING_ZEV_MANAGER_ALREADY_APPROVED:
      "Der Zev-Manager kann keine Operation für eine bestätigte Abrechnung ausführen",
    ADMIN_EMAIL_CHANGE_NOT_PERMITTED: "Die E-Mail-Adresse des Administrators kann nicht geändert werden.",
    ADMIN_PROFILE_DELETION_NOT_PERMITTED: "Das Administratorprofil kann nicht gelöscht werden.",
    ZEV_PRICE_CALCULATOR_INSUFFICIENT_YEAR_DATA: "Für das angegebene Jahr sind nicht genügend ZEV-Daten verfügbar.",
    ZEV_PRICE_CALCULATOR_MISSING_INPUT: "Dem Zev fehlt der Eingabepreisrechner.",
    ZEV_PRICE_CALCULATOR_MISSING_YEAR_TARIFFS: "Für das angegebene Jahr gibt es keine Tarife.",
    ZEV_PRICE_CALCULATOR_PRICES_HIGHER_THAN_REFERENCE:
      "Die berechneten ZEV-Netzkauf- und DL-Kosten sind höher als die des Referenzprodukts.",
    ZEV_PRICE_CALCULATOR_MISSING_YEAR_VAT_RATE:
      "Der Mehrwertsteuersatz für das angegebene Jahr konnte nicht gefunden werden.",
    SAP_MISCONFIGURED_PARTICIPANT: "Einem oder mehreren Teilnehmern fehlt ihre externe Referenznummer.",
    CONSUMPTION_POINT_UPDATE_TOO_MANY_PARTICIPANTS:
      "Ein Update ist nicht zulässig, da bereits ein oder mehrere Teilnehmer hinzugefügt wurden.",
    ZEV_PRICE_CALCULATOR_MISSING_ENERGY_DATA: "Zev-Preisrechner fehlen Energiedaten.",
    CONTRACT_ZEV_ACTIVATION_MISSING_PRICE_COMPONENT:
      "Das Produkt hat nicht für alle Stromzählertypen der ZEV-Verbrauchsstellen eine Preiskomponente definiert.",
    USER_ACCOUNT_ZEV_MANAGER_INACTIVE_CONTRACT:
      "Das Profil ist nicht an mindestens ein ZEV gehängt, welches aktiv ist und einen aktiven Vertrag hat.",
    ZEV_PRICE_CALCULATOR_INCONSISTENT_INPUT_VALUES:
      "Basierend auf Ihren Angaben kann kein Preis berechnet werden. Dieser Fehler tritt auf, wenn ihre Angaben " +
      "inkonsistent sind. Bitte überprüfen Sie Ihre Angaben oder kontaktieren Sie unseren Support.",
    PARTICIPATION_FIRST_ACTIVE_START_DATE:
      "Der Teilnehmer konnte nicht hinzugefügt werden. Die Verbrauchsstelle muss mindestens ein Startdatum haben.",
    USER_DELETION_FAILED:
      "Das Löschen des Benutzers ist fehlgeschlagen. Bitte kontaktieren Sie Ihren Systemadministrator.",
    PROFILE_DELETION_MANAGING_ZEV:
      "Der ZEV-Verwalter konnte nicht gelöscht werden, da er in einer ZEV registriert ist. Bitte entfernen Sie den " +
      "ZEV-Verwalter aus der ZEV, bevor Sie fortfahren.",

    // Custom Generic errors
    GENERIC_401: "Sie sind nicht berechtigt diese Aktion auszuführen.",
    GENERIC_FATAL_ERROR: "Etwas ist schief gelaufen",
    GENERIC_TIMEOUT_ERROR: "Die Anfrage konnte nicht erfolgreich bearbeitet werden. Bitte versuchen Sie es erneut.",
  },
  en: {
    ZEV_PRICE_PACKAGE_INVALID_ORDER: "The pricepackage has an invalid order",
    ZEV_PRICE_PACKAGE_INVALID_PRICE_STRUCTURE: "The pricepackage has an invalid price structure",
    ZEV_PRICE_PACKAGE_NOT_FOUND: "The pricepackage could not be found",
    ZEV_PRICE_PACKAGE_CANNOT_DELETE_DEFAULT: "The default pricepackage must not be deleted",
    ZEV_PRICE_PACKAGE_ALREADY_EXISTS: "The pricepackage already exists",
    ZEV_PRICE_PACKAGE_INVALID_ID: "The provided pricepackage ID is invalid",
    FORGOT_PASSWORD_TOKEN_VALIDATION: "FORGOT_PASSWORD_TOKEN_VALIDATION",
    FORGOT_PASSWORD_ACTION_DONE: "FORGOT_PASSWORD_ACTION_DONE",
    FORGOT_PASSWORD_ACTION_EXPIRED: "FORGOT_PASSWORD_ACTION_EXPIRED",
    USER_ACCOUNT_MISCONFIGURED_ROLE: "USER_ACCOUNT_MISCONFIGURED_ROLE",
    USER_ACCOUNT_MISCONFIGURED_PERSON: "USER_ACCOUNT_MISCONFIGURED_PERSON",
    USER_ACCOUNT_VERIFICATION_PENDING: "USER_ACCOUNT_VERIFICATION_PENDING",
    USER_ACCOUNT_INVALID_CREDENTIALS: "USER_ACCOUNT_INVALID_CREDENTIALS",
    USER_ACCOUNT_INVALID_PASSWORD: "USER_ACCOUNT_INVALID_PASSWORD",
    USER_ACCOUNT_EMAIL_ACTION_DONE: "E-mail action is done",
    USER_ACCOUNT_EMAIL_UNAVAILABLE: "E-mail unavailable",
    USER_ACCOUNT_EMAIL_TOKEN_VALIDATION: "Action not valid",
    USER_ACCOUNT_SET_PASSWORD_ACTION_DONE: "New password setup is done",
    USER_ACCOUNT_SET_PASSWORD_ACTION_EXPIRED: "New password setup has expired",
    USER_ACCOUNT_SET_PASSWORD_TOKEN_VALIDATION: "Invalid new password setup authorisation",
    USER_ACCOUNT_ALREADY_SETUP: "Profile already setup",
    USER_ACCOUNT_VERIFICATION_EXPIRED: "Action has expired",
    USER_ACCOUNT_BLOCKED: "USER_ACCOUNT_BLOCKED",
    USER_ACCOUNT_INVALID_BLOCK_ACTION_USER: "You can't use this action on yourself",
    INVALID_PASSWORD: "INVALID_PASSWORD",
    INVALID_EMAIL: "E-mail is not valid",
    ZEV_INVALID_ZEV_MANAGER: "An administrator must not be a ZEV manager of a ZEV.",
    ZEV_INVALID_BILLING_DATE:
      "The provided next billing date is not valid. It must be either on the 30.06 or the 31.12.",
    ZEV_INVALID_ZEV_START_DATE:
      "The provided zev start date is not valid. It must be on or after the service start date of the zev.",
    OBJECT_NOT_FOUND: "OBJECT_NOT_FOUND",
    VALIDATION_ERROR: "VALIDATION_ERROR",
    OTHER: "something went wrong :(",
    PERMISSION_ERROR: "You don't have the rights to access this resource",
    INVALID_ADMIN_EMAIL_DOMAIN: "Invalid email domain for administrator",
    INVALID_PRICE_COMPONENT_VALID_FROM_MONTH_START:
      "Price Component date of 'valid from' must be at the first day of the month",
    INVALID_PRICE_COMPONENT_VALID_UNTIL_BLANK_MONTH_END:
      "Price Component date of 'valid until' must be either blank or the last day of the month",
    INVALID_PRICE_COMPONENT_VALID_UNTIL_FUTURE: "Price Component date of 'valid until' must be the last day of a month",
    INVALID_PRICE_COMPONENT_VALID_UNTIL_TERMINATION: "Only an active Price Component can be terminated",
    INVALID_PRICE_COMPONENT_VALID_UNTIL_MONTH_END:
      "Price Component date of 'valid until' must be the last day of a month",
    INVALID_STATE_TRANSITION: "Invalid state transition",
    INVALID_PRICE_COMPONENT_PRODUCT_LINK: "Price component is not linked to a product",
    SERVICE_COMPONENT_NAME_UNAVAILABLE: "Service component name is unavailable",
    CONTRACT_ZEV_HAS_DRAFT_CONTRACT: "There can only be one DRAFT at a time",
    CONTRACT_ZEV_HAS_APPROVED_CONTRACT: "Approved contract already exists; use replace",
    CONTRACT_ZEV_ACTIVATION_WITHOUT_PREDECESSOR: "Cannot activate contract without a predecessor",
    CONSUMPTION_POINT_ALREADY_VACANT: "The consumption point is already vacant",
    CONSUMPTION_POINT_ZEV_PARTICIPANT_NOT_IN_ZEV: "The zev participant is not in this zev",
    CONSUMPTION_POINT_INVALID_SELF_ZEV_PARTICIPANT: "The participant cannot be substituted with himself",
    INVALID_CONSUMPTION_POINT_STATE: "The consumption point is in an invalid state",
    PRODUCT_USED_IN_CONTRACT: "Product cannot be deleted as it is used in one or more contracts",
    PRODUCT_NOT_LISTED: "Product cannot be deleted as it is not listed",
    INVALID_METERING_CODE_LENGTH: "MeteringCode must be 33 characters in length",
    NO_VALID_CONTRACT_FOUND: "No currently active contract found for this zev",
    PARTICIPATION_VACANCY_MODIFICATION: "Vacancy cannot be modified",
    PARTICIPATION_FIRST_ENTRY_DATE_MODIFICATION: "Cannot modify the move-in date of the first entry",
    PARTICIPATION_MOVE_OUT_DATE_UNDEFINED: "There is no move-out defined so it cannot be changed",
    PARTICIPATION_MOVE_BEFORE_ZSD: "No move-ins are allowed before zev start date",
    PARTICIPATION_MOVE_BILL_EXISTS: "There already exists an approved bill at the time of the move date",
    PARTICIPATION_CANCEL_MOVE_IN_VACANCY_NO_MODIFICATION: "Vacancy cannot be modified",
    PARTICIPATION_CANCEL_MOVE_IN_KNOWN_SUCCESSOR: "Cannot cancel the move-in when there is already a known successor",
    PARTICIPATION_CANCEL_MOVE_IN_BILL_EXISTS: "There already exists an approved bill at the time of the move-in date",
    PARTICIPATION_CANCEL_MOVE_IN_VACANCY_PERIOD_BILLED:
      "Change would extend the vacancy period which is already fully billed",
    PARTICIPATION_CANCEL_MOVE_OUT_VACANCY_NO_MODIFICATION: "Vacancy cannot be modified",
    PARTICIPATION_CANCEL_MOVE_OUT_DATE_UNDEFINED: "There is no move-out date defined so nothing can be cancelled",
    PARTICIPATION_CANCEL_MOVE_OUT_KNOWN_SUCCESSOR:
      "A move-out cannot be cancelled if a new participant is already defined",
    PARTICIPATION_CANCEL_MOVE_OUT_NEXT_PARTICIPANT_KNOWN_SUCCESSOR:
      "A move-out cannot be cancelled if the next participant also already has a successor",
    PARTICIPATION_CANCEL_MOVE_OUT_BILL_EXISTS: "There already exists an approved bill at time of the move-out date",
    PARTICIPATION_MOVE_IN_VACANCY_ONLY: "Can only move into a vacancy",
    PARTICIPATION_MOVE_IN_DATE_BEFORE_VACANCY_START: "The move-in date cannot before the start of the vacancy",
    PARTICIPATION_MOVE_IN_VACANCY_NO_SUCCESSOR: "Can only move into a vacancy if there is no successor",
    PARTICIPATION_MOVE_IN_UNKNOWN_ZEV_PARTICIPANT: "This ZEV participant does not belong to this ZEV",
    PARTICIPATION_MOVE_IN_BILL_EXISTS: "There already exists an approved bill at time of the move-in date",
    PARTICIPATION_MOVE_OUT_WITHOUT_NP_VACANCY_NO_MODIFICATION: "Vacancy cannot be modified",
    PARTICIPATION_MOVE_OUT_WITHOUT_NP_KNOWN_SUCCESSOR: "There already exists a successor",
    PARTICIPATION_MOVE_OUT_WITHOUT_NP_DATE_AFTER_MOVE_IN_DATE:
      "The move-out date of the current participant must be after its move-in date",
    PARTICIPATION_MOVE_OUT_WITHOUT_NP_BILL_EXISTS:
      "There already exists an approved bill at the time of the move-out date",
    PARTICIPATION_MOVE_OUT_WITH_NP_DATE_AFTER_MOVE_IN_DATE:
      "The move-out date of the current participant must be after its move-in date",
    PARTICIPATION_MOVE_OUT_WITH_NP_DATE_BEFORE_NP_MOVE_IN:
      "The move-in date of the new participant must be after the old participant",
    PARTICIPATION_MOVE_OUT_WITH_NP_KNOWN_SUCCESSOR: "There already exists a successor for this entry",
    PARTICIPATION_MOVE_OUT_WITH_NP_UNKNOWN_ZEV_PARTICIPANT: "This ZEV participant does not belong to this ZEV",
    PARTICIPATION_MOVE_OUT_WITH_NP_BILL_EXISTS:
      "There already exists an approved bill at the time of the move-out date",
    PARTICIPATION_FIRST_ENTRY_EXISTS: "There already exists an entry",
    SERVICE_BILLING_PROVIDE_START_END_DATES: "You must provide startdate and enddate for a recurring billing",
    SERVICE_BILLING_BILLED_ZEV_ACTIVE_TERMINATED: "Only active or inactive & terminated Zevs can be billed",
    INDV_BILLING_AFTER_ZEV_START_DATE:
      "The billing period of an individual billing process must be after the zev start date",
    INDV_BILLING_BEFORE_SYSTEM_START:
      "The billing period of an individual billing process must be after the system start date",
    BILL_PRICES_NOT_PROVIDED: "To create a Bill you must provide the zev prices",
    USER_ACCOUNT_MISCONFIGURED_ZEV_MANAGER:
      "You have not yet been assigned to a ZEV. Please contact your contact person or try again later.",
    SERVICE_BILLING_RUN_OVERLAPPING_OBJECT:
      "There is another service billing overlapping with the one you are trying to create",
    ZEV_WRONG_USER_TYPE: "Only a person with userType ZEV_MANAGER can be a ZEV manager",
    ZEV_WRONG_PRICES: "You have provided the wrong number of prices",
    ZEV_REACTIVATION_DATE_MISSING: "If the Zev is in state modified a reactivation date has to be provided",
    ZEV_DEACTIVATION_DATE: "Service end date cannot be before service start date",
    ZEV_DELETE_NOT_LISTED: "The zev you are trying to delete is not listed",
    CONSUMPTION_POINT_INACTIVE_BILLABLE_DATES: "billableTo needs to be after billableFrom",
    CONTRACT_TERMINATION_DATE: "Termination must be after start date",
    CONTRACT_CANNOT_REPLACE_CONTRACT_WITH_INITIAL_BILLS:
      "Cannot replace contract as predecessor has active initial bills.",
    CONTRACT_CANNOT_REPLACE_CONTRACT_WITH_RECURRING_BILLS:
      "Cannot replace contract as predecessor has active recurring bills.",
    PARTICIPATION_START_BEFORE_END: "The start date of the participant must be before the its end date",
    PARTICIPATION_END_AFTER_START: "The end date of the participant must be after the its start date",
    CONSUMPTION_POINT_START_BEFORE_END: "The start date of the consumption point must be before the its end date",
    CONSUMPTION_POINT_UPDATE_START_DATE_WITH_EXISTING_BILLS:
      "The start date of a consumption point cannot be modified when approved bills already exist for " +
      "this consumption point",
    ALL_BILLING_INVALID_STATE_CUSTOMER:
      "The data for the billing is no longer available. We will notify you when the data is available again.",
    INDV_BILLING_INVALID_STATE_CUSTOMER:
      "The data for the billing is no longer available. We will notify you when the data is available again.",
    USER_ACCOUNT_ZEV_MANAGER_UNASSIGNED:
      "You have not yet been assigned to a ZEV. Please contact your contact person or try again later.",
    ZEV_EXTERNAL_REFERENCE_NUMBER_MISSING: "The Zev external reference number is missing.",
    PRICE_COMPONENT_EXTERNAL_REFERENCE_NUMBER_MISSING:
      "One or more price component is missing its external reference number.",
    SAP_SERVICE_BILLING_RECURRING_DATES_NULL: "Recurring Service Billing is missing either its startDate or endDate.",
    SAP_SERVICE_BILLING_TYPES_MISMATCH: "Not all Service Billing types are the same.",
    SAP_SERVICE_BILLING_MISSING_RETURN_ITEM: "The expected return item is missing from the SAP response.",
    SAP_GENERAL_FAILURE: "Something went wrong with the SAP provider.",
    ZEV_PARTICIPANT_DELETE_IN_USE: "Cannot delete participant as it is used in at least one more participation.",
    SERVICE_BILLING_RUN_SAP_UPDATE_SOME_WITHOUT_RESULT: "One or more entries do not have a result",
    SERVICE_BILLING_RUN_SAP_UPDATE_MISMATCH: "One or more entries do not belong to this service billing run",
    SERVICE_BILLING_RUN_SAP_UPDATE_MISSING_DATA: "One or more entries are missing",
    PRODUCT_COLLECTION_RESTRICTED_ACCESS:
      "Access to this resource is restricted based on the product's service component's type: collection",
    PARTICIPANTS_ALREADY_CONFIRMED_SAP_SYNC: "Participant has already been synchronised.",
    BILLING_ZEV_MANAGER_ALREADY_APPROVED:
      "The Zev Manager can't perform any operation on a billing that has been confirmed",
    ADMIN_EMAIL_CHANGE_NOT_PERMITTED: "The Admin's email cannot be changed.",
    ADMIN_PROFILE_DELETION_NOT_PERMITTED: "The Admin profile cannot be deleted.",
    ZEV_PRICE_CALCULATOR_INSUFFICIENT_YEAR_DATA: "Insufficient available ZEV data for the specified year.",
    ZEV_PRICE_CALCULATOR_MISSING_INPUT: "The Zev is missing its price calculator input.",
    ZEV_PRICE_CALCULATOR_MISSING_YEAR_TARIFFS: "Tariffs for the provided year are missing.",
    ZEV_PRICE_CALCULATOR_PRICES_HIGHER_THAN_REFERENCE:
      "Calculated ZEV grid purchase & DL costs are higher than those of the reference product.",
    ZEV_PRICE_CALCULATOR_MISSING_YEAR_VAT_RATE: "Could not find the vat rate for the given year.",
    SAP_MISCONFIGURED_PARTICIPANT: "One or more participant is missing its external reference number.",
    CONSUMPTION_POINT_UPDATE_TOO_MANY_PARTICIPANTS:
      "Update is not allowed because one or more participants have already been added.",
    ZEV_PRICE_CALCULATOR_MISSING_ENERGY_DATA: "Zev price calculator is missing energy data.",
    CONTRACT_ZEV_ACTIVATION_MISSING_PRICE_COMPONENT:
      "The product has not defined a price component for all electricity meter types of the ZEV consumption points.",
    USER_ACCOUNT_ZEV_MANAGER_INACTIVE_CONTRACT:
      "The profile is not linked to at least one active ZEV that has an active contract.",
    ZEV_PRICE_CALCULATOR_INCONSISTENT_INPUT_VALUES:
      "No price can be calculated based on your information. This error occurs when your information is " +
      "inconsistent. Please check your details or contact our support.",
    PARTICIPATION_FIRST_ACTIVE_START_DATE:
      "The participant could not be added. The consumption point must at least be active and have a start date.",
    USER_DELETION_FAILED: "User deletion failed. Please contact your system administrator.",
    PROFILE_DELETION_MANAGING_ZEV:
      "The ZEV manager could not be deleted as it is registered in a ZEV. Please remove the ZEV manager " +
      "from the ZEV before proceeding.",

    // Custom Generic errors
    GENERIC_401: "You don't have permission to perform this action",
    GENERIC_FATAL_ERROR: "something went wrong.",
    GENERIC_TIMEOUT_ERROR: "the operation you intended had a timeout error",
  },
}

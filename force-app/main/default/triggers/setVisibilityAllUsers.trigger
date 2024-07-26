/*
* Trigger to set the visibility to AllUsers when agents upload photos of 
* properties so that the pictures become visible to on the website to guests
* 
* The picture uploaded must have a LinkedEntityType to a property

Issues : What if an agent uploads a file into salesforce files that is NOT a photo but linked to the property?
*/

trigger setVisibilityAllUsers on ContentDocumentLink (before insert) {
    if (Trigger.isInsert) {
        for ( ContentDocumentLink file : Trigger.new) {
            Property__c property = [SELECT Id FROM Property__c WHERE Id =:file.LinkedEntityId LIMIT 1];
            if (property != null) {
                if ( property.getSObjectType() == Property__c.getSObjectType() ) {
                    file.Visibility = 'AllUsers';
                }
            }    
        } 
    }
}
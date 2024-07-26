/*
 *Trigger to prevent duplicate property amenities from being created. 
 * 
*/

trigger preventDuplicatePropertyAmenities on Property_Amenity__c (before insert, before update) {
    if (Trigger.isInsert || Trigger.isUpdate) {
        List<Property_Amenity__c> records = [SELECT Id, Property__r.Id, Amenity__r.Id FROM Property_Amenity__c];
        for (Property_Amenity__c newPropAmens : Trigger.new) {
            for ( Property_Amenity__c curPropAmens : records ) {
                if ( newPropAmens.Property__r.Id == curPropAmens.Property__r.Id || newPropAmens.Amenity__r.Id == curPropAmens.Amenity__r.Id  ) {
                    newPropAmens.addError('The amenity you are attempting to add to this property already exists.');
                }
            }
        }
    }
}
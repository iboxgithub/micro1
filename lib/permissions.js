/**
 * Created by ibox on 9/2/14.
 */
// check that the userId (auto mapped) owns the documents

//fonction générique Core Meteor (cf documentation)
//userId is automatically connected to the current user ID requesting a DB action
//doc is the record to insert (if client wanna a specific _id)
//OR the SERVER version of the record to update
ownsDocumentTest = function(userId, doc) {
    //the doc has to exist (Meteor looks at it in the Collection allowed)
    //AND it has to owned by the user!!! I GET IT!!!!!!!!!!!!!!!! =)
    return doc && doc.userId === userId;
}
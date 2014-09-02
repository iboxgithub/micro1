/**
 * Created by ibox on 9/2/14.
 */
// check that the userId specified owns the documents
ownsDocument = function(userId, doc) {
    return doc && doc.userId === userId;
}
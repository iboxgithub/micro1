/**
 * Created by ibox on 9/2/14.
 */
// check that the userId specified owns the documents
/*A REVOIR !!!!!!!!!!!!!!!
un update/remove a été fait (sur Posts, cf posts.js)
et ce bloc est appelé MAIS
- depuis où sont envoyés les arguments ?
- qu'est-ce qui interprète le retour ???
*/

ownsDocumentTest = function(userId, doc) {
    return doc && doc.userId === userId;
}
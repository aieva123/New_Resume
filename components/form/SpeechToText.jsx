@@ .. @@
   return (
     <button
       onClick={handleSpeechToText}
-      className={`p-2 rounded-full transition-all duration-200 ${
+      className={`p-2 rounded-lg transition-all duration-200 shadow-sm ${
         isRecording 
-          ? 'bg-red-500 text-white animate-pulse' 
+          ? 'bg-red-500 text-white animate-pulse shadow-md' 
           : selectedField 
-            ? 'bg-green-500 text-white hover:bg-green-600' 
-            : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
+            ? 'bg-green-500 text-white hover:bg-green-600 shadow-md' 
+            : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
       }`}
       disabled={!selectedField}
       title={
@@ -44,7 +44,7 @@ const SpeechToText = ({ onResult, selectedField }) => {
           : "Select a field first, then click to start voice input"
       }
     >
-      <FaMicrophone className="w-4 h-4" />
+      <FaMicrophone className="w-5 h-5" />
     </button>
   );
 };
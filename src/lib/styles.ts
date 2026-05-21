const React = require("react-native");

const { StyleSheet } = React;

export const mystyles = StyleSheet.create({
    container: {
    flex: 1,
    position: 'relative', // Ensures children can be positioned relative to this view
    backgroundColor: '#f5f5f5',
  },
  /** Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: '#000',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    textAlign: 'center',
  },
  /** Content */
  content: {
    paddingHorizontal: 16,
  },
  contentFooter: {
    marginTop: 24,
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    color: '#a69f9f',
  },
  /** Section */
  section: {
    paddingVertical: 12,
  },
  sectionTitle: {
    margin: 8,
    marginLeft: 12,
    fontSize: 13,
    letterSpacing: 0.33,
    fontWeight: '500',
    color: '#a69f9f',
    textTransform: 'uppercase',
  },
  sectionBody: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  /** Profile */
  profile: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    marginRight: 12,
  },
  profileBody: {
    marginRight: 'auto',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#292929',
  },
  profileHandle: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: '400',
    color: '#858585',
  },
  /** Row */
  row: {
    height: 44,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 12,
  },
  rowWrapper: {
    paddingLeft: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#f0f0f0',
  },
  rowFirst: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  rowLabel: {
    fontSize: 16,
    letterSpacing: 0.24,
    color: '#000',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowSeparator: {
   borderTopWidth:1,borderColor:'#cdc'
    

  },
  rowValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ababab',
    marginRight: 4,
  },
  rowLast: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  rowLabelLogout: {
    width: '100%',
    textAlign: 'center',
    fontWeight: '600',
    color: '#dc2626',
  },
  input_box:{
    
      fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  
  },
   floatingButton: {
    position: 'absolute', // Sticks the button to its absolute position
    bottom: 30,             // Distance from the bottom of the screen
    right: 30,              // Distance from the right side of the screen
    width: 40,
    height: 40,
    borderRadius: 30,       // Makes it a perfect circle
    backgroundColor: '#6ab30c', // Classic Gmail Red
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,           // Adds shadow on Android
    shadowColor: '#000',    // Adds shadow on iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
   imageContainer: {
    position: 'relative', // Crucial for absolute positioning of the checkmark
    width: '25%',
    backgroundColor:'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  smallimage:{
    width:'30px'
    },
   image: {
    width: '100%',
    aspectRatio: 1,
  },
    checkmarkOverlay: {
    position: 'absolute',
    top: 10,  // Adjust to position where you want (e.g., top-right)
    right: 10,
    backgroundColor: 'white', // Optional: background to make the checkmark pop
    borderRadius: 15,
    
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallbutton:{
    fontSize: 14,   
    borderWidth: 1,           
   
    padding:5,
    borderColor: '#cde',     // Standard color string
    borderStyle: 'solid',   // Can be solid, dotted, or dashed
    borderRadius: 10, 
       backgroundColor: '#6ab30c', // Classic Gmail Red
    justifyContent: 'center',
    alignItems: 'center',  
  },
  modalView: {
    
    gap:15,
    backgroundColor: 'white',
   
   
   
  },
expInputView:{
   flexDirection:'row',width:'100%',alignContent:'center',alignItems:'center',
   marginBottom:6
},
expInput:{
  width:'80%',
  borderWidth:1,
  borderColor:'#909191',
  borderRadius:4,
  height:35,
  padding:1,
  paddingLeft:5
},
txnType:{
    width:70,
  borderWidth:1,margin:4,borderColor:'rgb(102, 102, 104)',
  padding:10,backgroundColor:'rgba(235, 241, 235, 0.86)',borderRadius:7,justifyContent:'center',alignItems:'center'
}

});


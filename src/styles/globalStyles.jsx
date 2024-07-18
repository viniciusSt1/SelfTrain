import { StyleSheet } from "react-native";

const colors = {
	primary1: "#00E0C7",
	primary2: "#009394",
	primary3: "#00627D",

	primary4: "#9BA8AB",
	primary5: "#4A5C6A",
	primary6: "#253745",
	primary7: "#11212D",
	primary8: "#06141B",

	primary9: "#070B0E",

	secondary1: "#940000",
	secondary2: "rgba(255,0,0,0.2)",
	secondary3: "#F03030"
}

const grays = {
	background_light:"#EDEDED",
	background_dark:"#222222",
	gray1:"#D9D9D9",
	gray2:"#CCD0CF",
	gray3:"#B9BDC0",
	gray4:"#AAAAAA",
	gray5:"#888888",
	gray6:"#353A40",
	gray7:"#2F2F2F",
	gray8:"#222222",
	gray9:"#1E1E1E",
	gray10:"#656C72"
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
	screen: {
		display: 'flex',
		flexDirection: 'column',
		gap:20,
		paddingHorizontal:20,
		paddingTop:20,
		flex:1
	}
});

export { colors, grays }

export default styles
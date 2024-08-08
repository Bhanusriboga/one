import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import networkCall from '../../utils/NetworkCall';
import { endPoints } from '../../config/config';
import Storage from '../../utils/Storage';

export const addPreferencesPost = createAsyncThunk('addPreferences/post',
    async (props, thunkAPI) => {
        const url = `${endPoints.addPreference}?userId=${Storage.get('userId')}`;

        const headers = {
            'Authorization': `Bearer ${Storage.get('token')}`,
        };
        const data=JSON.stringify({
            profileCreatedFor: props.profileCreatedFor.value,
            minAge: props.minAge.value,
            maxAge: props.maxAge.value,
            minHeight: props.minHeight.value,
            maxHeight: props.maxHeight.value,
            motherTongue: props.motherTongue.value,
            religion: props.religion.value,
            caste: props.caste.value,
            star: props.star.value,
            dosham: props.dosham.value == "Yes" ? true : false,
            education: props.education.value,
            occupation: props.occupation.value,
            employmentType: props.employment.value,
            annualIncome: props.annualIncome.value,
            city: props.city.value,
            state: props.state.value,
            country: props.country.value,
            martialStatus: props.maritalStatus.value,
            disability: props.disability.value,
            drinkingHabits: props.drinkingHabits.value,
            smokingHabits: props.smokingHabits.value,
            eatingHabits: props.eatingHabits.value
        })
        const { response, error } = await networkCall(url, 'POST', data, headers);
        if (response) {
            return thunkAPI.fulfillWithValue(response);
        } else {
            return thunkAPI.rejectWithValue(error || 'Something went wrong..!');
        }
    }
);


const addPreferencesSlice = createSlice({
    name: 'addPreferences',
    initialState: {
        loading: false,
        messsage: null
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(addPreferencesPost.pending, (state) => {
                state.loading = true
            })
            .addCase(addPreferencesPost.fulfilled, (state, action) => {
                state.loading = false
                state.messsage = action?.payload?.message || 'Successfully added'
            })
            .addCase(addPreferencesPost.rejected, (state, action) => {
                state.loading = false
                state.messsage = action.error.message
            })
    }
})

export default addPreferencesSlice.reducer

import MockAxios from 'Axios';
import Axios from './Axios';

describe("<Axios/> with allRecords", () => {

    MockAxios.allRecords.mockImplementationOnce(() =>
        Promise.resolve({
            data: {
                results: ['godan.jpg']
            }
        })
    );

    it("allRecords Image test", async () => {
        const data = await MockAxios.allRecords("test");
       //console.log(data);
        expect(data.data.results).toEqual(['godan.jpg']);
    })

    it("allRecords toHaveBeenCalledTimes test", async () => {
        expect(MockAxios.allRecords).toHaveBeenCalledTimes(1);
    })

    it("allRecords toHaveBeenCalledTimes test", async () => {
        expect(MockAxios.allRecords).toHaveBeenCalledWith("test");
    })
});

describe("<Axios/> with singleRecord", () => {

    MockAxios.singleRecord.mockImplementationOnce(() =>
        Promise.resolve({
            data: {
                results: ['test.jpg']
            }
        })
    );

    it("singleRecord Image test", async () => {
        const data = await MockAxios.singleRecord("test");
        //console.log(data);
        expect(data.data.results).toEqual(['test.jpg']);
    })

    it("singleRecord toHaveBeenCalledTimes test", async () => {
        expect(MockAxios.singleRecord).toHaveBeenCalledTimes(1);
    })

    it("singleRecord toHaveBeenCalledTimes test", async () => {
        expect(MockAxios.singleRecord).toHaveBeenCalledWith("test");
    })
});
const locationsService = require('../locations/locations.service')
const Location = require('../locations/locations.model')

jest.mock('../locations/locations.model');

describe('Location findAll', () =>{
    it('Should call model find', async () => {
         Location.find.mockResolvedValue([1, 2, 3, 4])
         expect(await locationsService.findAll()).toEqual([1,2,3,4])
         expect(Location.find).toHaveBeenCalledTimes(1)
    })
});

describe('Location findOne', () =>{
    it('Should get a Location', async () => {
        const mockLocation = {
            _id:'azertyuiop123poiuy', filmName:"Cybersecurity"
        }
        Location.findOne.mockResolvedValue(mockLocation)
        expect(await locationsService.findOne({_id:'azertyuiop123poiuy'})).toEqual(mockLocation)
        expect(Location.findOne).toHaveBeenCalledTimes(1)
    })

    it('Should get a Location', async () => {
        jest.resetAllMocks()
        const mockLocation = null
        Location.findById.mockResolvedValue(mockLocation)
        expect(await locationsService.findOne('azertyuiop123poiuy')).rejects.toThrow()
        expect(Location.findById).toHaveBeenCalledTimes(1)
    })
});

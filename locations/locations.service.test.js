const locationsService = require("./locations.service")
const Location = require("./locations.model")

jest.mock("./locations.model")

describe('Locations Findall',() => {
    it('Should call model find', async () => {
        Location.find.mockResolvedValue([1,2,3,4])
        expect(await locationsService.findAll()).toEqual([1,2,3,4])
        expect(Location.find).toHaveBeenCalledTimes(1)
    })
})

describe('Locations FindOne', () => {
    it('Should get a Location', async () => {
        const mockLocation = {
            _id: '63893fc840db1ac3aead1bae', filmName: 'BALTHAZAR 23 et 24'
        }
        Location.findById.mockResolvedValue(mockLocation)
        expect(await locationsService.findOne('63893fc840db1ac3aead1bae')).toEqual(mockLocation)
        expect(Location.findById).toHaveBeenCalledTimes(1)
    })

    it('Should get a Location', async () => {
        jest.resetAllMocks()
        const mockLocation = null
        Location.findById.mockResolvedValue(mockLocation)
        expect(async () => await locationsService.findOne('63893fc840db1ac3aead1bae')).rejects.toThrow()
        expect(Location.findById).toHaveBeenCalledTimes(1)
    })
})
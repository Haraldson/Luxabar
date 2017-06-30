import { Collection } from 'backbone'
import { CollectionView } from 'backbone.marionette'
import childView from './color'

export default CollectionView.extend({
    id: 'colors',
    className: 'columns',

    childView
})

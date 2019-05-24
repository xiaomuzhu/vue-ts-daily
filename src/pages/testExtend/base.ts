import { Vue, Component } from 'vue-property-decorator'

@Component
export default class BaseComp extends Vue {
  public ver: number = 123

  public testFun(): any {
    console.log('testFun from BaseComp')
  }

}

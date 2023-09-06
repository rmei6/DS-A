// Given two integer arrays pushed and popped each with distinct values,
// return true if this could have been the result of a sequence of push and pop 
// operations on an initially empty stack, or false otherwise

function real_stack(pushed, popped) {
  let stack = []
  let push_i = 0
  let pop_i = 0
  while(pop_i < popped.length){
      if(stack[stack.length - 1] == popped[pop_i]){
          stack.pop()
          pop_i += 1
      }else{
          if(push_i == pushed.length){return false}
          stack.push(pushed[push_i])
          push_i += 1
      }
  }
  return true
}
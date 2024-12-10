# Parallel Mergesort

Implement a parallel version of mergesort (both the original recursive and the
iterative in-place version from a previous exercise are fine). You may use any
parallelization framework or method.

I have not provided any test code, but you can base yours on test code from
other exercises. Your tests must check the correctness of the result of running
the function and run automatically when you commit through a GitHub action.

## Runtime Analysis

What is the span of the parallel program, in terms of worst-case $\Theta$? Hint:
It may help to consider the DAG of the parallel program.
I had ai help with figuring out how to use async functions.

The span of the parallel merge sort program is big theta (n) in the worst case. This is determined by the merge operations, which cannot be parallelized and take big theta (n) time at the top lecel of recursion. The recursion itself divides the input array into halves in log n levels with two other problems being solved in parallel at each level. The critical path through the recursion tree corresponds to the series of merge operations along a single branch, where the time at each level forms a geometric series: bigTheta(n) + bigTheta(n/2) + bigTheta(n/4)+ ... + bigTheta(1). The sum of this series simplifies to big theta (n). The span of the parallel merge sort program is big theta (n) indicating that ecen with an infinite number of processors, the execution time is proportional to the size of the input.

"I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice."
